import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/health')
    health(): HttpStatus.OK {
        return HttpStatus.OK;
    }

    @Get()
    getData() {
        return this.appService.getData();
    }
}
