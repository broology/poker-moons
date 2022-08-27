import type { PlayerId } from '@poker-moons/shared/type';

/**
 * @description The auth data stored for a player based on the table they are on.
 */
export interface AuthData {
    /**
     * @description The clients player id for the table.
     */
    playerId: PlayerId;

    /**
     * @description The clients token to authentication request for the given `playerId`
     */
    token: string;

    /**
     * @description The date the data was set on the client.
     */
    createdAt: Date;
}
