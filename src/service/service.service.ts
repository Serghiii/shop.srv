import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { GroupService } from '../group/group.service';
import { SubGroupService } from '../subgroup/subgroup.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Category } from '../category/category.entity';
import { Group } from '../group/group.entity';
import { SubGroup } from '../subgroup/subgroup.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class ServiceService {
    constructor(
          @InjectDataSource() private datasource: DataSource,
          private categoryService: CategoryService,
          private groupService: GroupService,
          private productService: ProductService,
          private subgroupService: SubGroupService,
    ) { }

    async getMenu() {
       const categories = await this.categoryService.getAllCategories()
       const groups = await this.groupService.getAllGroups()
       const subgroups = await this.subgroupService.getAllSubGroups()
       return { categories, groups, subgroups}
    }

    async isSubgroup(ref: string) {
        return (await this.datasource.createQueryBuilder()
            .select('1')
            .from(SubGroup, 'sg')
            .where('sg.ref = "' + ref + '"')
            .limit(1)
            .getRawMany()).length > 0
    }

    async isGroup(ref: string) {
        return (await this.datasource.createQueryBuilder()
            .select('1')
            .from(Group, 'sg')
            .where('sg.ref = "' + ref + '"')
            .limit(1)
            .getRawMany()).length > 0
    }

    async isCategory(ref: string) {
        return (await this.datasource.createQueryBuilder()
            .select('1')
            .from(Category, 'sg')
            .where('sg.ref = "' + ref + '"')
            .limit(1)
            .getRawMany()).length > 0
    }


    async getCombinedPage(ref:string, q:any) {
        let res = {
            data: [],
            page: 'not_found'
        }

        if (q.id) {
            res.data = await this.productService.getOne(q.id, ref)
            if (res.data.length) res.page = 'product'
        } else
        if (await this.isSubgroup(ref)) {
            res.data = await this.productService.getFilters(ref, q.filter?q.filter:'');
            if (res.data.length) res.page = 'subgroup'
        } else
        if (await this.isGroup(ref) || await this.isCategory(ref)) {
            res.page = 'group'
        }
        return res
    }

}
