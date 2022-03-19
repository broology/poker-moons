import { Controller, Param, Post } from '@nestjs/common';
import { TableId } from '@poker-moons/shared/type';
import { ReadyQueueService } from './ready-queue.service';

/**
 * Only being used for testing purposes, should not exist on a live server.
 *
 * @deprecated
 */
@Controller()
export class ReadyQueueController {
    constructor(private readonly readyQueueService: ReadyQueueService) {}

    @Post('start')
    start(@Param('tableId') tableId: TableId): Promise<Date> {
        return this.readyQueueService.start(tableId);
    }

    @Post('stop')
    stop(@Param('tableId') tableId: TableId): Promise<void> {
        return this.readyQueueService.stop(tableId);
    }
}
