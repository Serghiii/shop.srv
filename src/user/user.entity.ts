import { Activation } from '../activation/activation.entity'
import { Ban } from '../ban/ban.entity'
import { Cart } from '../cart/cart.entity'
import { Firm } from '../firm/firm.entity'
import { Profile } from '../profile/profile.entity'
import { Role } from '../role/role.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ type: 'varchar', length: 13, nullable: true, unique: true })
	phone?: string

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string

	@Exclude()
	@Column({ type: 'varchar' })
	password: string

	@Column({ type: 'boolean', default: false })
	active: boolean

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable()
	roles: Role[]

	@ManyToMany(() => Firm, (firm) => firm.users)
	@JoinTable()
	firms: Firm[]

	@OneToOne(() => Activation, (activation) => activation.user)
	activation: Activation

	@OneToOne(() => Profile, (profile) => profile.user)
	profile: Profile

	@OneToOne(() => Cart, (cart) => cart.user)
	cart: Cart

	@OneToOne(() => Ban, (ban) => ban.user)
	ban: Ban

	constructor(partial: Partial<User>) {
		Object.assign(this, partial)
	}
}
