import { Firm } from "../firm/firm.entity";
import { Order } from "../order/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "orderdetails" })
export class OrderDetails {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'integer' })
   code: number;

   @Column({ type: 'varchar' })
   name: string;

   @Column({ type: 'integer' })
   amount: number;

   @Column({ type: 'integer' })
   sum: number;

   @Column({ type: 'integer', default: 0 })
   discount: number;

   @Column({ type: 'date', nullable: true })
   compdate: Date;

   @Column({ type: 'varchar', nullable: true })
   comment: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne(() => Firm, firm => firm.orderdetails, { nullable: false })
   firm: Firm;

   @ManyToOne(() => Order, order => order.orderdetails, { nullable: false, onDelete: 'CASCADE' })
   @JoinColumn({ name: "orderId" })
   order: Order;

}