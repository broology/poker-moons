import { PlayerAction } from '../player-action';

/**
 * PUT /table/:tableId/player/:playerId/action
 *
 * - Fold
 * - Call
 * - Raise
 * - Check
 */
export type PerformPlayerActionRequest = PlayerAction;
export type PerformPlayerActionResponse = void;
