import { ActionCreator, createAction, on, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { ApiLoaderStates, TableState } from '../../table.state';

export type ActionType<T> = ActionCreator<string, (props: { payload: T }) => { payload: T } & TypedAction<string>>;

export const generateActionName = (description: string): string => `[@poker-moons] ${description}`;

export function createActionType<T>(description: string): ActionType<T> {
    return createAction(generateActionName(description), props<{ payload: T }>());
}

export interface AsyncRequestActions<Request, SuccessResponse, ErrorResponse> {
    request: ActionType<Request>;
    success: ActionType<SuccessResponse>;
    failure: ActionType<ErrorResponse>;
}
/**
 * @description Function to standardize the different actions in an client async request.
 *
 * @param description - Unique description of the action.
 *
 * @returns {request, success, failure} - Actions.
 */
export function buildAsyncRequestActions<Request, SuccessResponse, ErrorResponse>(
    description: string,
): AsyncRequestActions<Request, SuccessResponse, ErrorResponse> {
    return {
        request: createActionType(`${description} - request`),
        success: createActionType(`${description} - success`),
        failure: createActionType(`${description} - failed`),
    };
}

/**
 * @description Function to build the loader reducers for the given async requests build via {@link buildAsyncRequestActions}.
 *
 * This will update the table state loading values automatically when the actions are performed.
 *
 * @param request - The async request to create the loader reducer for.
 * @param loader - The specific loader value to update for this request.
 *
 * @returns
 */
export function buildAsyncRequestLoaderReducers<Request, SuccessResponse, ErrorResponse>(
    request: AsyncRequestActions<Request, SuccessResponse, ErrorResponse>,
    loader: keyof ApiLoaderStates,
) {
    return [
        on<TableState, [ActionType<Request>]>(request.request, (state) => ({
            ...state,
            loaders: {
                ...state.loaders,
                [loader]: true,
            },
        })),
        on<TableState, [ActionType<SuccessResponse>]>(request.success, (state) => ({
            ...state,
            loaders: {
                ...state.loaders,
                [loader]: false,
            },
        })),
        on<TableState, [ActionType<ErrorResponse>]>(request.failure, (state) => ({
            ...state,
            loaders: {
                ...state.loaders,
                [loader]: false,
            },
        })),
    ];
}
