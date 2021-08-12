import { User } from "../user/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartDetails } from "../cartdetails/cartdetails.entity";

@Entity({ name: "carts" })
export class Cart {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @OneToOne(() => User, user => user.cart, { onDelete: 'CASCADE' })
   @JoinColumn()
   user: User;

   @OneToMany(() => CartDetails, cartdetails => cartdetails.cart)
   cartdetails: CartDetails[];

}