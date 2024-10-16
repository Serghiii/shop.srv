import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { GroupService } from '../group/group.service';
import { SubGroupService } from '../subgroup/subgroup.service';

@Injectable()
export class ServiceService {
    constructor(
          private categoryService: CategoryService,
          private groupService: GroupService,
          private subgroupService: SubGroupService,
    ) { }

    async getMenu() {
       const categories = await this.categoryService.getAllCategories()
       const groups = await this.groupService.getAllGroups()
       const subgroups = await this.subgroupService.getAllSubGroups()
       return { categories, groups, subgroups}
    }
}
