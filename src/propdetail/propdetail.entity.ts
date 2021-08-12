import { ProductInfo } from "../productinfo/productinfo.entity";
import { Prop } from "../prop/prop.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "propdetails" })
export class PropDetail {

   @PrimaryColumn({ type: 'varchar', length: 50 })
   id: string;

   @Column({ type: 'varchar', nullable: false })
   name: string;

   @OneToMany(() => ProductInfo, productinfo => productinfo.propdetail)
   productinfo: ProductInfo[];

   @ManyToOne(() => Prop, prop => prop.propdetails, { nullable: false, onDelete: 'CASCADE' })
   prop: Prop;

}