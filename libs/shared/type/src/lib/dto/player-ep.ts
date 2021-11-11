import { Card } from '../card';
import { Player } from '../player';

/**
 * POST /table/:tableId/player
 *
 * For the player to join a game
 */
export type JoinTableRequest = Pick<Player, 'username'>;
export type JoinTableResponse = Player;

/**
 * PUT /table/:tableId/player/:playerId
 *
 * For the player to leave the game
 */
export type LeaveTableResponse = Player;

/**
 * GET /table/:tableId/player/:playerId/cards
 *
 * Gets the players cards for the round. This is to avoid sending cards via websocket
 */
export type GetPlayerCardsResponse = [Card, Card] | [];
