import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type ActionType<T> = ActionCreator<string, (props: { payload: T }) => { payload: T } & TypedAction<string>>;

export const generateActionName = (description: string): string => `[@poker-moons] ${description}`;

export function createActionType<T>(description: string): ActionType<T> {
    return createAction(generateActionName(description), props<{ payload: T }>());
}

/**
 * Function to standardize the different actions in an client async request
 *
 * @param description - Unique description of the action
 * @returns {request, success, failure} - actions
 */
export function buildAsyncRequestActions<Request, SuccessResponse, ErrorResponse>(
    description: string,
): {
    request: ActionType<Request>;
    success: ActionType<SuccessResponse>;
    failure: ActionType<ErrorResponse>;
} {
    return {
        request: createActionType(`${description} - request`),
        success: createActionType(`${description} - success`),
        failure: createActionType(`${description} - failed`),
    };
}
