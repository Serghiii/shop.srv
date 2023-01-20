import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity({ name: "productpics" })
export class ProductPics {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', nullable: false })
   pic: string;

   @ManyToOne(() => Product, product => product.productpics, { nullable: false, onDelete: 'CASCADE' })
   product: Product;
}