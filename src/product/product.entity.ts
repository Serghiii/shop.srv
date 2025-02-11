import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { CartDetails } from '../cartdetails/cartdetails.entity'
import { Firm } from '../firm/firm.entity'
import { ProductInfo } from '../productinfo/productinfo.entity'
import { SubGroup } from '../subgroup/subgroup.entity'

export enum EnumProductState {
	InStock,
	RuningOut,
	OutOfStock,
	ToOrder
}

@Entity({ name: 'products' })
export class Product {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ type: 'integer', unique: true })
	code: number

	@Column({ type: 'varchar' })
	name: string

	@Column({ type: 'integer' })
	amount: number

	@Column({ type: 'integer', default: 0 })
	price: number

	@Column({ type: 'integer', default: 0 })
	priceold: number

	@Column({ type: 'integer', default: 0 })
	dcount: number // discount count

	@Column({ type: 'integer', default: 0 })
	dpercent: number // discount percent

	@Column({ type: 'varchar', nullable: true })
	pic: string

	@Column({ type: 'simple-array', nullable: true })
	imgs: string[]

	@Column({
		type: 'enum',
		enum: EnumProductState,
		default: EnumProductState.InStock
	})
	state: EnumProductState

	@CreateDateColumn()
	createdAt: Date

	@Index('updatedAt-idx')
	@UpdateDateColumn()
	updatedAt: Date

	@ManyToOne(() => Firm, (firm) => firm.product, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	firm: Firm

	@ManyToOne(() => SubGroup, (subgroup) => subgroup.product, {
		nullable: false
	})
	subgroup: SubGroup

	@OneToMany(() => CartDetails, (cartdetails) => cartdetails.product)
	cartdetails: CartDetails[]

	@OneToMany(() => ProductInfo, (productinfo) => productinfo.product)
	productinfo: ProductInfo[]
}
