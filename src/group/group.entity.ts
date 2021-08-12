import { Product } from "../product/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";

@Entity({ name: "groups" })
export class Group {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', unique: true })
   name: string;

   @Column({ type: 'varchar', unique: true })
   name_ru: string;

   @Column({ type: 'varchar' })
   ref: string;

   @Column({ type: 'varchar' })
   pic: string;

   @ManyToOne(() => Category, category => category.groups, { nullable: false })
   category: Category;

   @OneToMany(() => Product, product => product.group)
   products: Product[];

}