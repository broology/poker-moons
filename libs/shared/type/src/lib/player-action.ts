export const playerActions = ['fold', 'call', 'raise', 'check'] as const;

export type PlayerActionType = typeof playerActions[number];

interface GeneralPlayerAction<Type extends PlayerActionType> {
    type: Type;
}

export type FoldPlayerAction = GeneralPlayerAction<'fold'>;
export type CallPlayerAction = GeneralPlayerAction<'call'>;

export interface RaisePlayerAction extends GeneralPlayerAction<'raise'> {
    amount: number;
}

export type CheckPlayerAction = GeneralPlayerAction<'check'>;

export type PlayerAction = FoldPlayerAction | CallPlayerAction | RaisePlayerAction | CheckPlayerAction;
