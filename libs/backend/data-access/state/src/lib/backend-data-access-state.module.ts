import { Module, Provider } from '@nestjs/common';
import { RedisStateService } from './redis-state/redis-state-service';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const STATE_SERVICE = 'stateService';

const StateService: Provider = {
    provide: STATE_SERVICE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => new RedisStateService(configService), // When redis state service becomes implemented, change to RedisStateService
};

@Module({
    providers: [StateService],
    exports: [StateService],
    imports: [ConfigModule],
})
export class BackendDataAccessStateModule {}
