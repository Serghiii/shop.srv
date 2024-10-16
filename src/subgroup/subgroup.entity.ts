import { Group } from "../group/group.entity";
import { Product } from "../product/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "subgroups" })
export class SubGroup {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', unique: true })
   name: string;

   @Column({ type: 'varchar' })
   ref: string;

   @Column({ type: 'varchar' })
   pic: string;

   @ManyToOne(() => Group, group => group.subgroup, { nullable: false })
   group: Group;

   @OneToMany(() => Product, product => product.subgroup)
   product: Product[];

}