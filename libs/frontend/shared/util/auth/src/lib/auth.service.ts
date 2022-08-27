import { Injectable } from '@angular/core';
import { TableId } from '@poker-moons/shared/type';
import { AuthData } from './auth.type';

/**
 * @description Service responsible setting and getting the auth data from the `localStorage`.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
    /**
     * @description Sets the auth data for the given {@link tableId}.
     *
     * @param tableId - The id of the table.
     * @param data - The auth data such as the token to store for the table.
     */
    set(tableId: TableId, data: Omit<AuthData, 'createdAt'>): void {
        const value = JSON.stringify({ ...data, createdAt: new Date() });

        localStorage.setItem(tableId, value);
    }

    /**
     * @description Fetches the {@link AuthData} from local storage for the given {@link tableId} if it exists.
     *
     * @param tableId - The id of the table.
     */
    get(tableId: string): AuthData | null {
        const value = localStorage.getItem(tableId);

        if (!value) {
            return null;
        }

        return JSON.parse(value);
    }
}
