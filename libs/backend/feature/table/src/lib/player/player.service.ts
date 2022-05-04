import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    GetPlayerCardsResponse,
    JoinTableRequest,
    JoinTableResponse,
    LeaveTableResponse,
    PlayerId,
    TableId,
    Player,
    Card,
    SeatId,
    PlayerReadyStatusEvent,
    ToggleReadyStatusResponse
} from '@poker-moons/shared/type';
import { TableStateManagerService } from '../table-state-manager/table-state-manager.service';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { DeckManagerService } from '../round/deck-manager/deck-manager.service';
import { ReadySystemService } from '../shared/ready-system/ready-system.service';

const initialPlayerState: Player = {
    id: '' as PlayerId,
    username: '',
    img: '',
    stack: 0,
    //TODO: Does waiting make sense here for status?
    status: 'waiting',
    called: 0,
    seatId: null,
    cards: []

}

@Injectable()
export class PlayerService {
    private logger = new CustomLoggerService(PlayerService.name);

    constructor(
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly deckManagerService: DeckManagerService,
        private readonly readySystemService: ReadySystemService
        ) {}

    async create(dto: JoinTableRequest, tableId: TableId): Promise<JoinTableResponse> {
        this.logger.log("New player has joined table " + tableId);
        const currentSeatMap: Partial<Record<SeatId, PlayerId>> = (await this.tableStateManagerService.getTableById(tableId)).seatMap;
        const seatArray: SeatId[] = Object.keys(currentSeatMap) as Array<unknown> as Array<SeatId>;
        const firstAvailableSeat = seatArray.find(key => currentSeatMap[key] === undefined);
        const newPlayer:Player = {...initialPlayerState, username: dto.username, seatId: firstAvailableSeat as SeatId};
        await this.tableStateManagerService.addNewPlayerToTable(tableId, newPlayer);
        return newPlayer;
    }

    async delete(tableId: TableId, playerId: PlayerId): Promise<LeaveTableResponse> {
        //TODO: rename to removeFromTable? leave?
        this.logger.log("Player " + playerId + " has left table " + tableId);
        const playerUpdate: Partial<Player> = {
            status : 'out'
        };
        await this.tableStateManagerService.updateTablePlayer(tableId, playerId, playerUpdate);
        return (await this.tableStateManagerService.getTableById(tableId)).playerMap[playerId];
    }

    async getCards(tableId: TableId, playerId: PlayerId): Promise<GetPlayerCardsResponse> {
        this.logger.log("Player " + playerId + " has drawn their pocket cards");
        const currentPlayerState: Player = (await this.tableStateManagerService.getTableById(tableId)).playerMap[playerId];
        return currentPlayerState.cards;
    }

    async ready(tableId: TableId, playerId: PlayerId): Promise<ToggleReadyStatusResponse> {
        this.logger.log("Player " + playerId + " has updated ready status");
        //fetch current ready status
        const currentPlayerState: Player = (await this.tableStateManagerService.getTableById(tableId)).playerMap[playerId];
        currentPlayerState.ready = !currentPlayerState.ready
        //update table state with inverted ready status
        const playerUpdate: Partial<Player> = {
            ready: currentPlayerState.ready
        }
        const response = await this.tableStateManagerService.updateTablePlayer(tableId, playerId, playerUpdate);
        //trigger event in ready system to check if the table is ready to start
        if(currentPlayerState.ready) {
            this.readySystemService.onPlayerReadied(tableId);
        }
        else {
            this.readySystemService.onPlayerLeft(tableId);
        }
        //emit readystatusevent here
        return currentPlayerState;
    }
}
