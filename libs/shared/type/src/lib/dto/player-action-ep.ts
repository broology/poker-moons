import type { PlayerId } from '../player';
import type { PlayerAction } from '../player-action';
import type { TableId } from '../table';

/**
 * PUT /table/:tableId/player/:playerId/action
 *
 * - Fold
 * - Call
 * - Raise
 * - Check
 */
export interface PerformPlayerActionRequest {
    tableId: TableId;
    playerId: PlayerId;
    action: PlayerAction;
}
export type PerformPlayerActionResponse = void;
