import { Module } from '@nestjs/common';
import { PlayerActionModule } from '../../../player-action/player-action.module';
import { TurnTimerServiceConsumer } from './turn-timer-consumer.service';

@Module({
    imports: [PlayerActionModule],
    providers: [TurnTimerServiceConsumer],
    exports: [TurnTimerServiceConsumer],
})
export class TurnTimerConsumerModule {}
