import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { FirmService } from './firm.service'
import { FirmDto } from './firm.dto'
import { hasRole } from '../auth/role.decorator'
import { User } from '../auth/user.decorator'

@Controller('firm')
export class FirmController {
   constructor(private firmService: FirmService) {}

   @hasRole('ADMIN')
   @Post()
   async create(@Body() dto: FirmDto) {
      return await this.firmService.createFirm(dto)
   }

   @hasRole('EDITOR')
   @Get()
   async getAll(@User() { id }: any) {
      return await this.firmService.getAllFirms(id)
   }

   @hasRole('EDITOR')
   @Get('/:value')
   async getByValue(@Param('value') value: string, @User() { id }: any) {
      return await this.firmService.getFirm(value, id)
   }
}
