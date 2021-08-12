
import { User } from "../user/user.entity";
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "activations" })
export class Activation {

   @PrimaryGeneratedColumn('uuid')
   uuid: string;

   @CreateDateColumn()
   createdAt: Date;

   @OneToOne(() => User, user => user.activation, { onDelete: 'CASCADE' })
   @JoinColumn()
   user: User;

}
