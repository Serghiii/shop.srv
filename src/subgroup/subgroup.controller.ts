import { Controller, Get } from '@nestjs/common';
import { SubGroupService } from './subgroup.service';

@Controller('subgroups')
export class SubgroupController {
       constructor(private groupService: SubGroupService,
       ) { }
    
       @Get()
       getAllGroups() {
          return this.groupService.getAllSubGroups();
       }
}
