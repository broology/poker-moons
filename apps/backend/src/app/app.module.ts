import { Module } from '@nestjs/common';
import { BackendFeatureTableModule } from '@poker-moons/backend/feature/table';
import { AppController } from './app.controller';

@Module({
    imports: [BackendFeatureTableModule],
    controllers: [AppController],
})
export class AppModule {}
