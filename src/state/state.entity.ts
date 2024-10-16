import { Product } from "../product/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "states" })
export class State {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', unique: true })
   name: string;

   @Column({ type: 'varchar', unique: true })
   name_ru: string;

   @OneToMany(() => Product, product => product.state)
   products: Product[];

}