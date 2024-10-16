import { Controller, Get, Param } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService,
    ) { }

    @Get('menu')
    getAllCategories() {
        return this.serviceService.getMenu()
    }

    @Get('menu/contains/:value')
    getMenuContains(@Param('value') ref:string) {
        return this.serviceService.getMenuContains(ref)
    }
}
