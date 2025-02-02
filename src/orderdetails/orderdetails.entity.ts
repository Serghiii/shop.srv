import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Firm } from '../firm/firm.entity'
import { Order } from '../order/order.entity'

export enum EnumOrderStatus {
	Panding,
	Payed,
	Shipped,
	Delivered
}

@Entity({ name: 'orderdetails' })
export class OrderDetails {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ type: 'integer' })
	code: number

	@Column({ type: 'varchar' })
	name: string

	@Column({ type: 'integer' })
	amount: number

	@Column({ type: 'integer' })
	sum: number

	@Column({ type: 'integer', default: 0 })
	discount: number

	@Column({
		type: 'enum',
		enum: EnumOrderStatus,
		default: EnumOrderStatus.Panding
	})
	status: EnumOrderStatus

	@Column({ type: 'varchar', nullable: true })
	comment: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@ManyToOne(() => Firm, (firm) => firm.orderdetails, { nullable: false })
	firm: Firm

	@ManyToOne(() => Order, (order) => order.orderdetails, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'orderId' })
	order: Order
}
