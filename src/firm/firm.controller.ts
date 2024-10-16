import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FirmService } from './firm.service';
import { FirmDto } from './firm.dto';

@Controller('firm')
export class FirmController {
    
   constructor(private firmService: FirmService) { }

   @Post()
   create(@Body() dto: FirmDto) {
      return this.firmService.createFirm(dto);
   }

   @Get('/:value')
   getByValue(@Param('value') value: string | number) {
      return this.firmService.getFirm(value);
   }

}
