import { Cart } from "../cart/cart.entity";
import { Product } from "../product/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "cartdetails" })
export class CartDetails {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'integer' })
   amount: number;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne(() => Product, product => product.cartdetails, { nullable: false })
   product: Product;

   @ManyToOne(() => Cart, cart => cart.cartdetails, { nullable: false, onDelete: 'CASCADE' })
   cart: Cart;

}