export * from './lib/backend-feature-mock-state.module';

/*

ServerTableState = {
    name: string
    seatMap: Record<SeatId, PlayerId> | null,
    roundCount: number,
    activeRound: Round
    deck: Card[],
    playerMap: Record<Player, Players>
}

Round= {
    pot: number,
    toCall: number,
    turnCount: number,
    roundStatus: RoundStatus,
    activeSeat: SeatId | null;
    dealerSeat: SeatId,
    smallBlind: number,
    cards: Card[]
}

Player= {
    id: PlayerId,
    username: string,
    img: string,
    stack: number,
    status: PlayerStatus,
    called: number,
    cards: [Card, Card] | []
}



 */
