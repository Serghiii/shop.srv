import { OrderDetails } from "../orderdetails/orderdetails.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "orders" })
export class Order {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar' })
   details: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @OneToMany(() => OrderDetails, orderdetails => orderdetails.order)
   orderdetails: OrderDetails[];

}