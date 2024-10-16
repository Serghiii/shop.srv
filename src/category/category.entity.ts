import { Group } from "../group/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "categories" })
export class Category {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', unique: true })
   name: string;

   @Column({ type: 'varchar' })
   ref: string;

   @Column({ type: 'varchar' })
   pic: string;

   @OneToMany(() => Group, group => group.category)
   groups: Group[];

}