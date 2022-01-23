import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TableModule } from './table/table.module';
import { TableStateManagerModule } from './table-state-manager/table-state-manager.module';

@Module({
    imports: [
        TableModule,
        RouterModule.register([
            {
                path: 'table',
                module: TableModule,
            },
        ]),
        TableStateManagerModule,
    ],
})
export class BackendFeatureTableModule {}
