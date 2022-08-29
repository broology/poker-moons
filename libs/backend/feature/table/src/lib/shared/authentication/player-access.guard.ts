import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { PlayerId, ServerTableState, TableId } from '@poker-moons/shared/type';
import type { Request } from 'express';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';

/**
 * @description Guard that ensures that the client making the request has the appropriate access (`token` in
 * Authentication header) to perform the request for this player.
 *
 * The request must have parameters `tableId` and `playerId` in the url path for the guard to work as expected.
 */
@Injectable()
export class PlayerAccessGuard implements CanActivate {
    private readonly logger = new CustomLoggerService(PlayerAccessGuard.name);

    constructor(private readonly tableStateManagerService: TableStateManagerService) {}

    /**
     * @description Fetches the token form the request headers.
     *
     * @param request
     *
     * @returns The token from the client making the request. Or null if there is no token.
     */
    private static getToken(request: Request): string | null {
        const header = request.headers.authorization;

        if (!header) {
            return null;
        }

        const token = header.split('Bearer ')[1];

        if (!token) {
            return null;
        }

        return token;
    }

    /**
     * @description Fetches the associated table and player the request is intending to access. Ensures the table
     * and player exists. Then confirms the `token` of the client making the request matches the token of the player.
     *
     * @param context - Context of the clients request.
     *
     * @returns Whether or not the request has access to the player.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const tableId = request.params['tableId'] as TableId;
        const playerId = request.params['playerId'] as PlayerId;

        const token = PlayerAccessGuard.getToken(request);

        if (!token) {
            this.logger.error(`[${tableId}][${playerId}] Attempting to access player without a token.`);
            return false;
        }

        let table: ServerTableState;
        try {
            table = await this.tableStateManagerService.getTableById(tableId);
        } catch (e) {
            this.logger.error(`[${tableId}][${playerId}] Attempting to access table that does not exist.`);
            return false;
        }

        if (!table.playerMap[playerId]) {
            this.logger.error(`[${tableId}][${playerId}] Attempting to access player that does not exist.`);
            return false;
        }

        if (table.playerMap[playerId].token !== token) {
            this.logger.error(
                `[${tableId}][${playerId}] Attempting to access player with an invalid token of ${token}.`,
            );
            return false;
        }

        return true;
    }
}
