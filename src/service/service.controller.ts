import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService,
    ) { }

    @Get('menu')
    getAllCategories() {
        return this.serviceService.getMenu()
    }

    @Get('combined/page/:value')
    getCombinedPage(@Param('value') group:string, @Query() q) {
        return this.serviceService.getCombinedPage(group, q)
    }
}
