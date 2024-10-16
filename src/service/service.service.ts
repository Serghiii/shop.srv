import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { GroupService } from '../group/group.service';
import { SubGroupService } from '../subgroup/subgroup.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Category } from '../category/category.entity';
import { Group } from '../group/group.entity';
import { SubGroup } from '../subgroup/subgroup.entity';

@Injectable()
export class ServiceService {
    constructor(
          @InjectDataSource() private datasource: DataSource,
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

    async getMenuContains(ref: string) {
        const qb = this.datasource.createQueryBuilder()

        const CategoryQuery = qb.subQuery()
            .select('1 as val')
            .from(Category, 'c')
            .where('c.ref = "' + ref + '"')
            .limit(1)
            .getQuery()

        const GroupQuery = qb.subQuery()
            .select('2 as val')
            .from(Group, 'g')
            .where('g.ref = "' + ref + '"')
            .limit(1)
            .getQuery()

        const SubGroupQuery = qb.subQuery()
            .select('4 as val')
            .from(SubGroup, 'sg')
            .where('sg.ref = "' + ref + '"')
            .limit(1)
            .getQuery()

        const res = await this.datasource.manager.createQueryBuilder()
        .select('sum(t.val) as data')
        .from('(' + CategoryQuery + 'union' + GroupQuery + 'union' + SubGroupQuery + ')', 't')
        .getRawMany()

        return res[0]
    }
 
}
