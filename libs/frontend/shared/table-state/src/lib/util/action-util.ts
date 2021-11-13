import { createAction, props } from '@ngrx/store';

export const generateActionName = (description: string): string => `[@poker-moons] ${description}`;

/**
 * Function to standardize the different actions in an client async request
 *
 * @param description - Unique description of the action
 * @returns [request, success, failure] - actions
 */
export function buildAsyncRequestActions<SuccessResponse, ErrorResponse>(description: string) {
    return [
        createAction(generateActionName(`${description} - request`)),
        createAction(generateActionName(`${description} - success`), props<{ payload: SuccessResponse }>()),
        createAction(generateActionName(`${description} - failed`), props<{ error: ErrorResponse }>()),
    ] as const;
}
