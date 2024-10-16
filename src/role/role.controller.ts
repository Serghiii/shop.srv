import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';

@Controller('role')
export class RoleController {

   constructor(private roleService: RoleService) { }

   @Post()
   create(@Body() dto: RoleDto) {
      return this.roleService.createRole(dto);
   }

   @Get('/:value')
   getByValue(@Param('value') name: string) {
      return this.roleService.getRole(name);
   }

}
