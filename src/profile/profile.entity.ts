import { User } from "../user/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "profiles" })
export class Profile {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', length: 50 })
   name: string;

   @Column({ type: 'varchar', length: 1, nullable: true })
   gender: string;

   @Column({ type: 'varchar', nullable: true })
   avatar: string;

   @OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
   @JoinColumn()
   user: User;

}