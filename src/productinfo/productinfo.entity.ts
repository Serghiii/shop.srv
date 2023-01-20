import { Product } from "../product/product.entity";
import { Prop } from "../prop/prop.entity";
import { PropDetail } from "../propdetail/propdetail.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "productinfo" })
export class ProductInfo {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', nullable: false })
   value: string;

   @ManyToOne(() => Prop, prop => prop.productinfo, { nullable: false })
   prop: Prop;

   @ManyToOne(() => PropDetail, propdetail => propdetail.productinfo, { nullable: false })
   propdetail: PropDetail;

   @ManyToOne(() => Product, product => product.productinfo, { nullable: false, onDelete: 'CASCADE' })
   product: Product;

}