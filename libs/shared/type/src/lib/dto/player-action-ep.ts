import type { PlayerAction } from '../player-action';

/**
 * PUT /table/:tableId/player/:playerId/action
 *
 * - Fold
 * - Call
 * - Raise
 * - Check
 */
export interface PerformPlayerActionRequest {
    action: PlayerAction;
}
export type PerformPlayerActionResponse = void;
