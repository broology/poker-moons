import { Module } from '@nestjs/common';
import { PotManagerService } from './pot-manager.service';

@Module({
    providers: [PotManagerService],
    exports: [PotManagerService],
})
export class PotManagerModule {}
