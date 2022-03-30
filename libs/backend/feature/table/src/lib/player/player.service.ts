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
    SeatId
} from '@poker-moons/shared/type';
import { TableStateManagerService } from '../table-state-manager/table-state-manager.service';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { DeckManagerService } from '../round/deck-manager/deck-manager.service';

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
        private readonly deckManagerService: DeckManagerService
        ) {}

    async create(dto: JoinTableRequest, tableId: TableId): Promise<JoinTableResponse> {
        this.logger.log("New player has joined table " + tableId);
        //TODO: This method of finding first open seat feels big-time jankerino
        const currentSeatMap = (await this.tableStateManagerService.getTableById(tableId)).seatMap;
        const seatArray = Object.keys(currentSeatMap) as Array<unknown> as Array<SeatId>;
        let firstAvailableSeat = seatArray.find(key => currentSeatMap[key] === undefined);
        firstAvailableSeat = firstAvailableSeat as SeatId;
        const newPlayer:Player = {...initialPlayerState, username: dto.username, seatId: firstAvailableSeat};
        await this.tableStateManagerService.addNewPlayerToTable(tableId, newPlayer);
        return newPlayer;
    }

    async delete(tableId: TableId, playerId: PlayerId): Promise<LeaveTableResponse> {
        this.logger.log("Player " + playerId + " has left table " + tableId);
        const playerUpdate: Partial<Player> = {
            //TODO: OK with adding new status for left/out of game?
            status : 'out'
        };
        await this.tableStateManagerService.updateTablePlayer(tableId, playerId, playerUpdate);
        //TODO: Do we want to actually return the final state of the Player object here? or just a confirmation?
        return initialPlayerState;
    }

    async getCards(tableId: TableId, playerId: PlayerId): Promise<GetPlayerCardsResponse> {
        this.logger.log("Player " + playerId + " has drawn their pocket cards");
        //TODO: Is there a reason to pass deck explicitly when we already assume that the deck is associated with the tableID in the drawCard function?
        let currentDeck: Card[] = (await this.tableStateManagerService.getTableById(tableId)).deck;
        const drawFirstCardResponse = (await this.deckManagerService.drawCard(tableId, currentDeck));
        const card1: Card = drawFirstCardResponse.card;
        const card2: Card = (await this.deckManagerService.drawCard(tableId, drawFirstCardResponse.deck)).card;
        await this.tableStateManagerService.updateTablePlayer(tableId, playerId, {cards: [card1, card2]})
        return [card1, card2];
    }
}
