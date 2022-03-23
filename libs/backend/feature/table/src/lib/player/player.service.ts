import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    GetPlayerCardsResponse,
    JoinTableRequest,
    JoinTableResponse,
    LeaveTableResponse,
    PlayerId,
    TableId,
    Player,
    SeatId
} from '@poker-moons/shared/type';
import { TableStateManagerService } from '../table-state-manager/table-state-manager.service';
import { CustomLoggerService } from '@poker-moons/backend/utility';

const initialPlayerState: Player = {
    id: '' as PlayerId,
    username: '',
    img: '',
    stack: 0,
    //TODO: Does waiting make sense here for status?
    status: 'waiting',
    called: 0,
    //TODO: What's a good default value for seatId?
    seatId: 0 as SeatId,
    cards: []

}

@Injectable()
export class PlayerService {
    private logger = new CustomLoggerService(PlayerService.name);

    constructor(private readonly tableStateManagerService: TableStateManagerService) {}

    async create(dto: JoinTableRequest, tableId: TableId): Promise<JoinTableResponse> {
        this.logger.log("New player has joined table " + tableId)
        //TODO: Check current table seatmap and set seatId to first available seat?
        const newPlayer:Player = {...initialPlayerState, username: dto.username};
        //should the tableStateManger return the player directly?
        await this.tableStateManagerService.addNewPlayerToTable(tableId, newPlayer);
        return newPlayer;
    }

    async delete(tableId: TableId, playerId: PlayerId): Promise<LeaveTableResponse> {
        //are updateSeatMap or updatePlayerTable intended to handle this, or should I add a deleteTablePlayer?
        //return await this.tableStateManagerService.updateTablePlayer(dto);
        throw new NotImplementedException;
    }

    async getCards(tableId: TableId, playerId: PlayerId): Promise<GetPlayerCardsResponse> {
        //return await this.tableStateManagerService.updateTablePlayer(dto);
        throw new NotImplementedException;
    }
}
