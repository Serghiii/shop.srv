import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
   constructor(
      @InjectRepository(Group) private groupRepository: Repository<Group>,
   ) { }

   async getAllGroups() {
      return await this.groupRepository
         .createQueryBuilder("groups")
         .select('*')
         .getRawMany();
   }
}
