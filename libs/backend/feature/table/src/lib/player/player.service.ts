import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    GetPlayerCardsResponse,
    JoinTableRequest,
    JoinTableResponse,
    LeaveTableResponse,
    Player,
    PlayerId,
    PublicPlayer,
    SeatId,
    seats,
    TableId,
    ToggleReadyStatusResponse,
} from '@poker-moons/shared/type';
import { nanoid } from 'nanoid';
import { ReadySystemService } from '../shared/ready-system/ready-system.service';
import { TableGatewayService } from '../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../table-state-manager/table-state-manager.service';

const initialPlayerState: Omit<Player, 'id' | 'token'> = {
    username: '',
    img: '',
    stack: 3000,
    ready: false,
    timeBank: 300,
    status: 'waiting',
    roundCalled: 0,
    biddingCycleCalled: 0,
    seatId: null,
    cards: [],
};

@Injectable()
export class PlayerService {
    private logger = new CustomLoggerService(PlayerService.name);

    constructor(
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly readySystemService: ReadySystemService,
        private readonly tableGatewayService: TableGatewayService,
    ) {}

    /**
     * @description Removes any sensitive information from the `Player` and converts it to a public player.
     *
     * @param player
     *
     * @returns Public player without sensitive information.
     */
    private static toPublicPlayer(player: Player): PublicPlayer {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token, cards, ...publicPlayer } = player;

        return {
            ...publicPlayer,
            cards: [],
        };
    }

    async create(dto: JoinTableRequest, tableId: TableId): Promise<JoinTableResponse> {
        this.logger.log('New player has joined table ' + tableId);

        const { seatMap: currentSeatMap } = await this.tableStateManagerService.getTableById(tableId);

        const firstAvailableSeat = seats.find((key) => currentSeatMap[key] === undefined);

        if (firstAvailableSeat === undefined) {
            throw new BadRequestException('Table is full.');
        }

        // Generates the private unique token for the player.
        const token = nanoid(40);

        const newPlayer: Player = {
            ...initialPlayerState,
            username: dto.username,
            seatId: firstAvailableSeat as SeatId,
            token,
            id: `player_${nanoid()}`,
        };

        await this.tableStateManagerService.addNewPlayerToTable(tableId, firstAvailableSeat, newPlayer);

        this.readySystemService.onPlayerJoined(tableId);

        this.tableGatewayService.emitTableEvent(tableId, {
            type: 'playerJoined',
            seatId: firstAvailableSeat as SeatId,
            player: PlayerService.toPublicPlayer(newPlayer),
        });

        return newPlayer;
    }

    async delete(tableId: TableId, playerId: PlayerId): Promise<LeaveTableResponse> {
        //TODO: rename to removeFromTable? leave?
        this.logger.log('Player ' + playerId + ' has left table ' + tableId);
        //TODO: set seatId to null in the tableState? and pass previous seatId to frontend for update
        const playerUpdate: Partial<Player> = {
            status: 'out',
            seatId: null,
        };
        await this.tableStateManagerService.updateTablePlayer(tableId, playerId, playerUpdate);
        this.readySystemService.onPlayerLeft(tableId);
        const currentPlayerState: Player = (await this.tableStateManagerService.getTableById(tableId)).playerMap[
            playerId
        ];
        this.tableGatewayService.emitTableEvent(tableId, {
            type: 'playerLeft',
            seatId: currentPlayerState.seatId as SeatId,
        });
        return (await this.tableStateManagerService.getTableById(tableId)).playerMap[playerId];
    }

    async getCards(tableId: TableId, playerId: PlayerId): Promise<GetPlayerCardsResponse> {
        this.logger.log('Player ' + playerId + ' has drawn their pocket cards');
        const currentPlayerState: Player = (await this.tableStateManagerService.getTableById(tableId)).playerMap[
            playerId
        ];
        return currentPlayerState.cards;
    }

    async ready(tableId: TableId, playerId: PlayerId): Promise<ToggleReadyStatusResponse> {
        this.logger.log('Player ' + playerId + ' has updated ready status');
        //fetch current ready status
        const currentPlayerState: Player = (await this.tableStateManagerService.getTableById(tableId)).playerMap[
            playerId
        ];
        currentPlayerState.ready = !currentPlayerState.ready;
        //update table state with inverted ready status
        const playerUpdate: Partial<Player> = {
            ready: currentPlayerState.ready,
        };
        await this.tableStateManagerService.updateTablePlayer(tableId, playerId, playerUpdate);
        //update status in ready system to check if the table is ready to start
        if (currentPlayerState.ready) {
            this.readySystemService.onPlayerReadied(tableId);
        } else {
            this.readySystemService.onPlayerLeft(tableId);
        }
        //emit playerChanged event here
        this.tableGatewayService.emitTableEvent(tableId, {
            type: 'playerChanged',
            id: playerId,
            ready: currentPlayerState.ready,
        });
        return currentPlayerState;
    }
}
