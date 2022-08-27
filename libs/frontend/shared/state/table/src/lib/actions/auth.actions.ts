import { PlayerId } from '@poker-moons/shared/type';
import { createActionType } from '../shared/util/action-util';

/**
 * @description Action performed when the table state is initialized. and a player id is found in `localStorage` to
 * set the playerId of the table.
 */
export const setPlayerId = createActionType<{ playerId: PlayerId }>('set player id of existing player');
