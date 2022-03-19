import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { READY_BULL_QUEUE } from './ready-queue.const';
import { ReadyQueueConsumer } from './ready-queue.consumer';
import { ReadyQueueController } from './ready-queue.controller';
import { ReadyQueueService } from './ready-queue.service';

@Module({
    imports: [BullModule.registerQueue({ name: READY_BULL_QUEUE })],
    providers: [ReadyQueueService, ReadyQueueConsumer],
    exports: [ReadyQueueService],
    controllers: [ReadyQueueController],
})
export class ReadyQueueModule {}
