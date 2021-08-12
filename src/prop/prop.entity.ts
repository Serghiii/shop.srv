import { ProductInfo } from "../productinfo/productinfo.entity";
import { PropDetail } from "../propdetail/propdetail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "props" })
export class Prop {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', nullable: false })
   name: string;

   @Column({ type: 'varchar', nullable: false })
   name_ru: string;

   @OneToMany(() => ProductInfo, productinfo => productinfo.prop)
   productinfo: ProductInfo[];

   @OneToMany(() => PropDetail, propdetail => propdetail.prop)
   propdetails: PropDetail[];

}