import { OrderDetails } from "../orderdetails/orderdetails.entity";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "firms" })
export class Firm {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
   name: string;

   @Column({ type: 'bigint', unique: true, nullable: false })
   ipn: number;

   @Column({ type: 'varchar', length: 13, nullable: false })
   phone: string;

   @Column({ type: 'varchar', length: 50, nullable: false })
   email: string;

   @CreateDateColumn()
   createdAt: Date;

   @ManyToMany(() => User, user => user.firms)
   users: User[];

   @OneToMany(() => Product, product => product.firm)
   product: Product[];

   @OneToMany(() => OrderDetails, orderdetails => orderdetails.firm)
   orderdetails: OrderDetails[];

}