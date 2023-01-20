import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';
import { Brackets, DataSource, In, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductInfo } from '../productinfo/productinfo.entity';

@Injectable()
export class ProductService {
   constructor(
      @InjectDataSource() private datasource: DataSource,
      @InjectRepository(Product) private productRepository: Repository<Product>
   ) { }

   async getOne(id: number, ref: string = ''): Promise<any> {
      let opt1 = {
         where: { id },
         relations: ["productinfo", "productinfo.propdetail"]
      }
      let opt2 = {
         where: { id, group: { ref } },
         relations: ["group", "productinfo", "productinfo.propdetail"]
      }
      return await this.productRepository.find(ref.length ? opt2 : opt1)
   }

   async getAll(ref: string, q: any): Promise<{ results: Product[], count: number }> {
      let cond: [] | any = []

      for (let key in q) {
         if (key.toLowerCase() !== 'skip' && key.toLowerCase() !== 'limit') {
            cond.push(key)
         }
      }
      cond.sort((a, b) => a > b ? 1 : -1)

      const pri = this.datasource.manager
         .createQueryBuilder()
         .select("distinct pri.productId as Id")
         .from(ProductInfo, 'pri')
      cond.forEach(el => {
         const dt: string[] = el.split("-")
         if (dt.length) {
            for (let i = 1; i < dt.length; i++) {
               pri.leftJoin(ProductInfo, dt[0] + dt[i], 'pri.productId=' + dt[0] + dt[i] + '.productId')
            }
         }
      })
      let first: boolean = true
      cond.forEach(el => {
         if (first) {
            first = false
            pri.where(new Brackets(
               qb => {
                  const dt: string[] = el.split("-")
                  if (dt.length) {
                     let first: boolean = true
                     for (let i = 1; i < dt.length; i++) {
                        if (first) {
                           first = false
                           qb.where(dt[0] + dt[i] + '.propdetailId="' + dt[0] + '-' + dt[i] + '"')
                        } else {
                           qb.orWhere(dt[0] + dt[i] + '.propdetailId="' + dt[0] + '-' + dt[i] + '"')
                        }
                     }
                  }
               }
            ))
         } else {
            pri.andWhere(new Brackets(
               qb => {
                  const dt: string[] = el.split("-")
                  if (dt.length) {
                     let first: boolean = true
                     for (let i = 1; i < dt.length; i++) {
                        if (first) {
                           first = false
                           qb.where(dt[0] + dt[i] + '.propdetailId="' + dt[0] + '-' + dt[i] + '"')
                        } else {
                           qb.orWhere(dt[0] + dt[i] + '.propdetailId="' + dt[0] + '-' + dt[i] + '"')
                        }
                     }
                  }
               }
            ))
         }
      })

      const qb = this.productRepository
         .createQueryBuilder("pr")
         .where(qb => {
            const subQuery = qb.subQuery()
               .select('gr.id')
               .from(Group, 'gr')
               .where('gr.ref = :value', { value: ref })
               .getQuery();
            return 'pr.groupId = ' + subQuery;
         })
      if (cond.length) {
         qb.andWhere(
            'pr.id in (' + pri.getQuery() + ')'
         )
      }
      qb.leftJoinAndSelect('pr.productinfo', 'pri')
      qb.leftJoinAndSelect('pri.propdetail', 'prd')
      const results = await qb.offset(q.skip * 2).limit(q.limit * 2).getMany();

      const qbc = this.productRepository
         .createQueryBuilder("pr")
         .select('count (*) as count')
         .where(qb => {
            const subQuery = qb.subQuery()
               .select('gr.id')
               .from(Group, 'gr')
               .where('gr.ref = :value', { value: ref })
               .getQuery();
            return 'pr.groupId = ' + subQuery;
         })
      if (cond.length) {
         qbc.andWhere(
            'pr.id in (' + pri.getQuery() + ')'
         )
      }
      const count = await qbc.getRawMany();

      return { results, count: count[0].count }
      /*
      SELECT distinct pri.productId as Id
      FROM shop.productinfo as pri
      left join(shop.productinfo as pri_a, shop.productinfo as pri_b, shop.productinfo as pri_c)
      on(pri.productId = pri_a.productId and pri.productId = pri_b.productId and pri.productId = pri_c.productId)
      where pri.productId in (select pr.id as id from shop.products pr where pr.groupId = 1) and
      (pri_a.propdetailId = "brand-samsung" or pri_b.propdetailId = "brand-apple") and pri_c.propdetailId = "ram-val_4gb"         
      */
   }

   async getNewProducts(limit: number): Promise<Product[]> {
      return this.productRepository.find({
         relations: ["group", "productinfo", "productinfo.propdetail"],
         order: {
            updatedAt: 'DESC'
         },
         take: limit
      });
   }

   async getFilters(ref: string, q: {}): Promise<any> {
      let cond: [] | any = []
      for (let key in q) {
         cond.push(key)
      }
      cond.sort((a, b) => a > b ? 1 : -1)

      let gcond: [[]] | any = []
      let tmpEl: any;
      cond?.forEach((el: any) => {
         if (!el.includes(tmpEl)) {
            tmpEl = el.split('-')[0]
            let newGcond = cond.filter((item: any) => item.includes(tmpEl))
            gcond.push([tmpEl, [...newGcond]])
         }
      });

      const pra = this.productRepository
         .createQueryBuilder("pr")
         .select('props.id as id, props.name as name, props.name_ru as name_ru, pri.propdetailId as prop, pri.value as propname')
         .leftJoin('pr.productinfo', 'pri')
         .leftJoin('pri.prop', 'props', 'pri.prop=props.id')
         .where(qb => {
            const subQuery = qb.subQuery()
               .select('gr.id')
               .from(Group, 'gr')
               .where('gr.ref = "' + ref + '"')
               .getQuery();
            return 'pr.groupId = ' + subQuery;
         })
      pra.groupBy('pri.propdetail')

      const prbsq = this.productRepository
         .createQueryBuilder("pr")
         .select('pri.productId as Id')
         .leftJoin('pr.productinfo', 'pri')

      for (let index = 1; index < gcond.length; index++) {
         prbsq.leftJoin('pr.productinfo', gcond[index][0])
      }

      prbsq.where(qb => {
         const subQuery = qb.subQuery()
            .select('gr.id')
            .from(Group, 'gr')
            .where('gr.ref = "' + ref + '"')
            .getQuery();
         return 'pr.groupId = ' + subQuery;
      })

      if (gcond.length) {
         let first: boolean = true
         gcond.forEach(el => {
            if (first) {
               first = false
               prbsq.andWhere(new Brackets(
                  qb => {
                     let first2: boolean = true
                     el[1].forEach(el2 => {
                        if (first2) {
                           first2 = false
                           qb.where(`pri.propdetailId = "${el2}"`)
                        } else {
                           qb.orWhere(`pri.propdetailId = "${el2}"`)
                        }
                     });
                  }
               ))
            } else {
               prbsq.andWhere(new Brackets(
                  qb => {
                     let first2: boolean = true
                     el[1].forEach(el2 => {
                        if (first2) {
                           first2 = false
                           qb.where(`${el[0]}.propdetailId = "${el2}"`)
                        } else {
                           qb.orWhere(`${el[0]}.propdetailId = "${el2}"`)
                        }
                     });
                  }
               ))
            }
         })
      }

      prbsq.groupBy('pri.productId')

      const prb = this.productRepository
         .createQueryBuilder("pr")
         .select('pri.propdetailId as prop, count(pri.productId) as count')
         .leftJoin('pr.productinfo', 'pri')
         .leftJoin('pri.prop', 'props', 'pri.prop=props.id')
         .where(qb => {
            const subQuery = qb.subQuery()
               .select('gr.id')
               .from(Group, 'gr')
               .where('gr.ref = "' + ref + '"')
               .getQuery();
            return 'pr.groupId = ' + subQuery;
         })
      if (gcond.length > 0) {
         prb.andWhere('pr.id in (' + prbsq.getQuery() + ')')
      }
      prb.groupBy('pri.propdetail')

      return this.datasource.manager
         .createQueryBuilder()
         .select("pr_a.Id as id, pr_a.name as name, pr_a.name_ru as name_ru, pr_a.prop as prop, pr_a.propname as propname, ifnull(pr_b.count, 0) as count")
         .from("(" + pra.getQuery() + ")", "pr_a")
         .leftJoin("(" + prb.getQuery() + ")", "pr_b", "pr_a.prop = pr_b.prop")
         .orderBy('name, propname')
         .getRawMany()

      /*
      select pr_a.Id as id, pr_a.name as name, pr_a.prop as prop, pr_a.propname as propname, pr_b.count as count
      from (
         select props.Id as Id, props.name as name, pri.propdetailId as prop, pri.value as propname
         from shop.products as pr 
         left join (shop.productinfo as pri, shop.props as props)
         on (pr.id = pri.productId and pri.propId = props.id)
         where pr.groupId = 1 /and pri.propdetailId LIKE 'brand-%'/
         group by pri.propdetailId
      ) as pr_a
      left join (
      (
         select pri.propdetailId as prop, count(pri.productId) as count
         from shop.products as pr 
         left join (shop.productinfo as pri, shop.props as props) 
         on (pr.id = pri.productId and pri.propId = props.id)
         where pr.groupId = 1 and pr.id in (
            SELECT pri_b.productId as Id
            FROM shop.products as pr
            left join (shop.productinfo as pri_b, shop.productinfo as pri_p)
            on (pr.Id = pri_b.productId and pr.Id = pri_p.productId)
            where pr.groupId = 1 and (pri_b.propdetailId = "brand-samsung" or pri_b.propdetailId = "brand-apple") and (pri_p.propdetailId = "ram-val_4gb" or pri_p.propdetailId = "ram-val_6gb")
            group by pri_b.productId
         )
         group by pri.propdetailId
      ) as pr_b
      )
      on (pr_a.prop = pr_b.prop)
      order by name, propname      
      */

   }

   async getCarts(Ids: number[]): Promise<Product[]> {
      return await this.productRepository.find({
         select: {
            id: true,
            code: true,
            name: true,
            amount: true,
            price: true,
            priceold: true,
            pic: true
         },
         where: { id: In(Ids) }
      })
   }

}
