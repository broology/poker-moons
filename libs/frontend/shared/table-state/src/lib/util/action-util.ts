import { createAction, props } from '@ngrx/store';

export const generateActionName = (desc: string): string => `[@poker-moons] ${desc}`;

export function buildAsyncRequestActions<SuccessResponse, ErrorResponse>(description: string) {
    return [
        createAction(generateActionName(`${description} - request`)),
        createAction(generateActionName(`${description} - success`), props<{ payload: SuccessResponse }>()),
        createAction(generateActionName(`${description} - failed`), props<{ error: ErrorResponse }>()),
    ] as const;
}
