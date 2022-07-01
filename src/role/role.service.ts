import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {

   constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

   async createRole(dto: RoleDto) {
      const role = await this.roleRepository.save(dto);
      return role;
   }

   async getRole(name: string) {
      const role = await this.roleRepository.findOneOrFail({ where: { name: name } });
      return role;
   }

}
