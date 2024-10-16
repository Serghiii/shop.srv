import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { SubGroup } from "../subgroup/subgroup.entity";

@Entity({ name: "groups" })
export class Group {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', unique: true })
   name: string;

   @Column({ type: 'varchar' })
   ref: string;

   @Column({ type: 'varchar', nullable: true })
   pic: string;

   @ManyToOne(() => Category, category => category.groups, { nullable: false })
   category: Category;

   @OneToMany(() => SubGroup, subgroup => subgroup.group)
   subgroup: SubGroup[];

}