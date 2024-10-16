import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FirmService } from './firm.service';
import { FirmDto } from './firm.dto';
import { hasRole } from 'src/auth/role.decorator';

@Controller('firm')
export class FirmController {
    
   constructor(private firmService: FirmService) { }

   @hasRole("ADMIN")
   @Post()
   create(@Body() dto: FirmDto) {
      return this.firmService.createFirm(dto);
   }

   @hasRole("OPER")
   @Get('/:value')
   getByValue(@Param('value') value: string) {
      return this.firmService.getFirm(value);
   }

}
