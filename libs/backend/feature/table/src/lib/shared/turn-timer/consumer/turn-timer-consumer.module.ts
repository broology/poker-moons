import { Module } from '@nestjs/common';
import { JobSchedulerModule } from '@poker-moons/backend/shared/service/job-scheduler';
import { PlayerActionModule } from '../../../player-action/player-action.module';
import { TurnTimerServiceConsumer } from './turn-timer-consumer.service';

@Module({
    imports: [PlayerActionModule, JobSchedulerModule],
    providers: [TurnTimerServiceConsumer],
    exports: [TurnTimerServiceConsumer],
})
export class TurnTimerConsumerModule {}
