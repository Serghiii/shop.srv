import { ProductInfo } from "../productinfo/productinfo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "productpics" })
export class ProductPics {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', nullable: false })
   pic: string;

   @ManyToOne(() => ProductInfo, productinfo => productinfo.productpics, { nullable: false })
   productinfo: ProductInfo;
}