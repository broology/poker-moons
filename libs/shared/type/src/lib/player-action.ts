export const playerActions = ['fold', 'call', 'raise', 'check'] as const;

export type PlayerActionType = typeof playerActions[number];

interface GeneralPlayerAction<T extends PlayerActionType> {
    type: T;
}

export type FoldPlayerAction = GeneralPlayerAction<'fold'>;
export type CallPlayerAction = GeneralPlayerAction<'call'>;
export interface RaisePlayerAction extends GeneralPlayerAction<'raise'> {
    amount: number;
}
export type CheckPlayerAction = GeneralPlayerAction<'check'>;

export type PlayerAction = FoldPlayerAction | CallPlayerAction | RaisePlayerAction | CheckPlayerAction;
