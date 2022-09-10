import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JOB_SCHEDULER_BULL_QUEUE } from '@poker-moons/backend/shared/service/job-scheduler';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Job } from 'bull';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../../websocket/table-gateway.service';
import { READY_SYSTEM_BULL_JOB } from '../ready-system.const';
import { ReadyQueueJobData } from '../ready-system.type';

/**
 * @description Consumer that is responsible for handling when a ready queue job executes. Starting the game.
 */
@Injectable()
@Processor(JOB_SCHEDULER_BULL_QUEUE)
export class ReadySystemConsumer {
    private readonly logger = new CustomLoggerService(ReadySystemConsumer.name);

    constructor(
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly roundManagerService: RoundManagerService,
    ) {}

    /**
     * @description Called when the ready queue job is completed for a table. Updates the table state and emits to
     * the client that the table is now `in-progress`.
     *
     * @param job Contains {@link ReadyQueueJobData}
     */
    @Process(READY_SYSTEM_BULL_JOB)
    async onComplete(job: Job<ReadyQueueJobData>): Promise<void> {
        this.logger.debug(`${job.id}: Table ready, starting game...`);

        const startDate = new Date();

        await this.tableStateManagerService.updateTable(job.data.tableId, {
            startDate,
            status: 'in-progress',
        });

        this.tableGatewayService.emitTableEvent(job.data.tableId, {
            startDate,
            status: 'in-progress',
            type: 'tableStatusChanged',
        });

        this.logger.log(`${job.id}: Table started`);

        await this.roundManagerService.startRound(job.data.tableId);
    }
}
