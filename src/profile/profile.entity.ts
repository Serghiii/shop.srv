import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'
import { User } from '../user/user.entity'

export enum EnumGender {
	male,
	female
}

@Entity({ name: 'profiles' })
export class Profile {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ type: 'varchar', length: 50 })
	name: string

	@Column({ type: 'enum', enum: EnumGender, nullable: true })
	gender: EnumGender

	@Column({ type: 'varchar', nullable: true })
	avatar?: string

	@OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
	@JoinColumn()
	user: User
}
