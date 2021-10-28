import { Module } from "@nestjs/common";
import { BackendFeatureTableModule } from "@poker-moons/backend/feature/table";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [BackendFeatureTableModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
