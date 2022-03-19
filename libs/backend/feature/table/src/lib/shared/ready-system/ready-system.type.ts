import { TableId } from '@poker-moons/shared/type';

/**
 * Data to be stored in a `bull` queue for the ready queue job
 */
export interface ReadyQueueJobData {
    tableId: TableId;
}
