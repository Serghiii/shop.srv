import { User } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "roles" })
export class Role {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
   name: string;

   @Column({ type: 'varchar' })
   description: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToMany(() => User, user => user.roles)
   users: User[];

}
