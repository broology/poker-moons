import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackendFeatureTableModule } from '@poker-moons/backend/feature/table';
import { AppController } from './app.controller';
import { BullConfigService } from './configs/bull-queue-config';

@Module({
    imports: [
        // Feature Modules
        BackendFeatureTableModule,

        // Shared Services
        BullModule.forRootAsync({ useClass: BullConfigService }),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [AppController],
})
export class AppModule {}
