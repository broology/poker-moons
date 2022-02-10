import { Module, Provider } from '@nestjs/common';
import { MockStateService } from './mock-state/mock-state.service';

export const STATE_SERVICE = 'stateService';

const StateService: Provider = {
    provide: STATE_SERVICE,
    useFactory: () => new MockStateService(), // When redis state service becomes implemented, change to RedisStateService
};

@Module({
    providers: [StateService],
    exports: [StateService],
})
export class BackendDataAccessStateModule {}
