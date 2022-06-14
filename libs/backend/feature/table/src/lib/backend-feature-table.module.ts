import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PlayerActionModule } from './player-action/player-action.module';
import { PlayerModule } from './player/player.module';
import { ReadySystemModule } from './shared/ready-system/ready-system.module';
import { TurnTimerModule } from './shared/turn-timer/turn-timer.module';
import { TableGatewayModule } from './shared/websocket/table-gateway.module';
import { TableModule } from './table/table.module';

@Module({
    imports: [
        // Feature Modules
        TableModule,
        PlayerModule,
        PlayerActionModule,

        // Consumer Modules
        // TurnTimerConsumerModule,

        // Routes
        RouterModule.register([
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
        ]),

        // Shared Services
        ReadySystemModule,
        TableGatewayModule,
        TurnTimerModule,
    ],
})
export class BackendFeatureTableModule {}
