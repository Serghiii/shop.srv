import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Group } from "../group/group.entity";
import { State } from "../state/state.entity";
import { CartDetails } from "../cartdetails/cartdetails.entity";
import { ProductInfo } from "../productinfo/productinfo.entity";
import { ProductPics } from "src/productpics/productpics.entity";
import { Firm } from "../firm/firm.entity";


@Entity({ name: "products" })
export class Product {

   @PrimaryGeneratedColumn({ type: 'bigint' })
   id: number;

   @Column({ type: 'integer', unique: true })
   code: number;

   @Column({ type: 'varchar' })
   name: string;

   @Column({ type: 'integer' })
   amount: number;

   @Column({ type: 'integer', default: 0 })
   price: number;

   @Column({ type: 'integer', default: 0 })
   priceold: number;

   @Column({ type: 'varchar' })
   pic: string;

   @CreateDateColumn()
   createdAt: Date;

   @Index('updatedAt-idx')
   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne(() => Firm, firm => firm.product, { nullable: false, onDelete: 'CASCADE' })
   firm: Firm;

   @ManyToOne(() => State, state => state.products, { nullable: false })
   state: State;

   @ManyToOne(() => Group, group => group.products, { nullable: false })
   group: Group;

   @OneToMany(() => CartDetails, cartdetails => cartdetails.product)
   cartdetails: CartDetails[];

   @OneToMany(() => ProductInfo, productinfo => productinfo.product)
   productinfo: ProductInfo[];

   @OneToMany(() => ProductPics, productpics => productpics.product)
   productpics: ProductPics[];

}