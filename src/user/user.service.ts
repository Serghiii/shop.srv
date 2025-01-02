import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
// import { Exception } from 'handlebars';
import * as bcrypt from 'bcryptjs'
import { DataSource, Repository } from 'typeorm'
import { BanDto } from '../ban/ban.dto'
import { BanService } from '../ban/ban.service'
import { Cart } from '../cart/cart.entity'
import en from '../locals/en'
import { MailService } from '../mail/mail.service'
import { Profile } from '../profile/profile.entity'
import { RoleService } from '../role/role.service'
import { AddRoleDto } from './dto/add-role.dto'
import { ExUserDto, UserDto } from './dto/user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectDataSource() private datasource: DataSource,
		@InjectRepository(User) private userRepository: Repository<User>,
		private roleService: RoleService,
		private banService: BanService,
		private mailService: MailService
	) {}

	async createUser(
		dto: UserDto,
		role: string,
		token: string = ''
	): Promise<User> {
		try {
			return await this.datasource.transaction(async (manager) => {
				const user = manager.create(User)
				user.phone = dto.phone
				user.email = dto.email
				user.password = dto.password
				if (token.length == 0) user.active = true // for google
				const role_ = await this.roleService.getRole(role)
				user.roles = []
				user.roles.push(role_)
				const res = await manager.save(user)
				const profile = manager.create(Profile)
				profile.name = dto.name
				if (token.length == 0) profile.avatar = (dto as ExUserDto).avatar // for google
				profile.user = res
				await manager.save(profile)
				const cart = manager.create(Cart)
				cart.user = res
				await manager.save(cart)
				if (token.length > 0) {
					console.log('token', token)
					// await this.mailService.sendMail(
					// 	user.email,
					// 	`${process.env.API_URL}/user/activate/${token}`,
					// 	dto
					// )
				}
				return res
			})
		} catch (e) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					message: en.messages.create_user_error,
					error: 'messages.create_user_error'
				},
				HttpStatus.BAD_REQUEST
			)
		}
	}

	async activateUser(user: User): Promise<User> {
		try {
			user.active = true
			return await this.userRepository.save(user)
		} catch (e) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					message: en.messages.activate_user_error,
					error: 'messages.activate_user_error'
				},
				HttpStatus.BAD_REQUEST
			)
		}
	}

	async updateUserPassword(id: number, password: string): Promise<User> {
		try {
			const user = await this.userRepository.findOneByOrFail({ id })
			user.password = await bcrypt.hash(password, 5)
			return await this.userRepository.save(user)
		} catch (e) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					message: en.messages.password_change_error,
					error: 'messages.password_change_error'
				},
				HttpStatus.BAD_REQUEST
			)
		}
	}

	async updateUserPhone(id: number, phone: string): Promise<User> {
		try {
			const user = await this.userRepository.findOneByOrFail({ id })
			user.phone = phone
			return await this.userRepository.save(user)
		} catch (e) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					message: en.messages.phone_change_error,
					error: 'messages.phone_change_error'
				},
				HttpStatus.BAD_REQUEST
			)
		}
	}

	async getAllUsers() {
		return await this.userRepository.find()
	}

	async getUserByLogin(phone: string, email: string) {
		return await this.userRepository.findOne({
			where: [{ phone: phone }, { email: email }],
			relations: ['roles', 'profile', 'ban']
		})
	}

	async getUserByMail(email: string) {
		return await this.userRepository.findOne({
			where: [{ email: email }],
			relations: ['roles', 'profile', 'ban']
		})
	}

	async getUserById(id: number, accept: boolean = false) {
		return await this.userRepository.findOneOrFail({
			where: [{ id }],
			relations: {
				roles: accept,
				profile: accept,
				ban: accept
			}
		})
	}

	async getUserProfileById(id: number) {
		const user = await this.userRepository.findOneOrFail({
			where: { id },
			relations: { profile: true }
		})
		return {
			name: user.profile.name,
			phone: user.phone,
			email: user.email,
			gender: user.profile.gender,
			avatar: user.profile.avatar
		}
	}

	async getUserFirmsById(id: number) {
		return (
			await this.userRepository.findOneOrFail({
				where: { id },
				relations: { firms: true }
			})
		).firms
	}

	async addRole(dto: AddRoleDto) {
		try {
			const user = await this.userRepository.findOneOrFail({
				where: { id: dto.userId },
				relations: { roles: true }
			})
			const role = await this.roleService.getRole(dto.name)
			if (user.roles.some((role_) => role_ == role)) {
				throw new Error() //Exception;
			}
			// user.roles = [];
			user.roles.push(role)
			this.userRepository.save(user)
			return dto
		} catch (e) {
			throw new HttpException(
				{
					statusCode: HttpStatus.NOT_FOUND,
					message: en.messages.role_not_found,
					error: 'messages.role_not_found'
				},
				HttpStatus.NOT_FOUND
			)
		}
	}

	async ban(dto: BanDto) {
		const user = await this.userRepository.findOne({
			where: { id: dto.userId },
			relations: ['bans']
		})
		if (!user) {
			throw new HttpException(
				{
					statusCode: HttpStatus.NOT_FOUND,
					message: en.messages.user_not_found,
					error: 'messages.user_not_found'
				},
				HttpStatus.NOT_FOUND
			)
		}
		if (user.ban) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					message: en.messages.user_banned,
					error: 'messages.user_banned'
				},
				HttpStatus.BAD_REQUEST
			)
		}
		return await this.banService.createBan(user, dto.reason)
	}
}
