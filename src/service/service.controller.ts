import { Controller, Get } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService,
    ) { }

    @Get('menu')
    getAllCategories() {
        return this.serviceService.getMenu()
    }
}
