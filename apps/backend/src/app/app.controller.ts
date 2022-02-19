import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/health')
    health(): HttpStatus.OK {
        return HttpStatus.OK;
    }
}
