import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {
    @Get()
    healthCheck(){
        return 'Client gateway is running and up!!';
    }
}
