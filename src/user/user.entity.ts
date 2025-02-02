import { Exclude } from 'class-transformer'
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
import { Ban } from '../ban/ban.entity'
import { Cart } from '../cart/cart.entity'
import { Firm } from '../firm/firm.entity'
import { Profile } from '../profile/profile.entity'
import { Role } from '../role/role.entity'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ type: 'varchar', length: 13, nullable: true, unique: true })
	phone?: string

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string

	@Exclude()
	@Column({ type: 'varchar', nullable: true })
	password?: string

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
