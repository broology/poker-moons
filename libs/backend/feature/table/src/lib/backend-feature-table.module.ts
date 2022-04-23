import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ReadySystemModule } from './shared/ready-system/ready-system.module';
import { TurnTimerModule } from './shared/turn-timer/turn-timer.module';
import { TableGatewayModule } from './shared/websocket/table-gateway.module';
import { TableModule } from './table/table.module';

@Module({
    imports: [
        // Feature Modules
        TableModule,

        // Routes
        RouterModule.register([
            {
                path: 'table',
                module: TableModule,
                children: [],
            },
        ]),

        // Shared Services
        ReadySystemModule,
        TableGatewayModule,
        TurnTimerModule,
    ],
})
export class BackendFeatureTableModule {}
