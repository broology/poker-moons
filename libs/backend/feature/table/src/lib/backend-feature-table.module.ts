import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { TableModule } from "./table/table.module";

@Module({
    imports: [TableModule, RouterModule.register([{ path: "table", module: TableModule }])]
})
export class BackendFeatureTableModule {}
