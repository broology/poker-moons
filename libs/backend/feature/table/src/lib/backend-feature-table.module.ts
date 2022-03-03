import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TableGatewayModule } from './shared/websocket/table-gateway.module';
import { TableModule } from './table/table.module';

@Module({
    imports: [
        TableModule,
        RouterModule.register([
            {
                path: 'table',
                module: TableModule,
            },
        ]),
        TableGatewayModule,
    ],
})
export class BackendFeatureTableModule {}
