import { Group } from "../group/group.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartDetails } from "../cartdetails/cartdetails.entity";
import { ProductInfo } from "../productinfo/productinfo.entity";
import { ProductPics } from "src/productpics/productpics.entity";


@Entity({ name: "products" })
export class Product {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'integer', unique: true })
   code: number;

   @Column({ type: 'varchar' })
   name: string;

   @Column({ type: 'integer' })
   amount: number;

   @Column({ type: 'integer', default: 0 })
   price: number;

   @Column({ type: 'integer', default: 0 })
   priceold: number;

   @Column({ type: 'varchar' })
   pic: string;

   @CreateDateColumn()
   createdAt: Date;

   @Index('updatedAt-idx')
   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne(() => Group, group => group.products, { nullable: false })
   group: Group;

   @OneToMany(() => CartDetails, cartdetails => cartdetails.product)
   cartdetails: CartDetails[];

   @OneToMany(() => ProductInfo, productinfo => productinfo.product)
   productinfo: ProductInfo[];

   @OneToMany(() => ProductPics, productpics => productpics.product)
   productpics: ProductPics[];

}