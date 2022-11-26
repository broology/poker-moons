import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { PlayerActionModule } from './player-action/player-action.module';
import { PlayerModule } from './player/player.module';
import { ReadySystemConsumerModule } from './shared/ready-system';
import { ReadySystemModule } from './shared/ready-system/ready-system.module';
import { TurnTimerConsumerModule } from './shared/turn-timer/consumer/turn-timer-consumer.module';
import { TurnTimerModule } from './shared/turn-timer/turn-timer.module';
import { TableGatewayModule } from './shared/websocket/table-gateway.module';
import { TableModule } from './table/table.module';

/**
 * @description Routes defined under `/table`.
 */
const routes: Routes = [
    {
        path: 'table',
        module: TableModule,
        children: [
            {
                path: ':tableId',
                children: [
                    {
                        path: 'player',
                        module: PlayerModule,
                        children: [
                            {
                                path: ':playerId',
                                children: [
                                    {
                                        path: 'action',
                                        module: PlayerActionModule,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

@Module({
    imports: [
        // Feature Modules
        TableModule,
        PlayerModule,
        PlayerActionModule,

        // Consumer Modules
        ReadySystemConsumerModule,
        TurnTimerConsumerModule,

        // Routes
        RouterModule.register(routes),

        // Shared Services
        ReadySystemModule,
        TableGatewayModule,
        TurnTimerModule,
    ],
})
export class BackendFeatureTableModule {}
