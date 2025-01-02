import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { Response } from 'express'
import { decodePayload, encodePayload, toMilliSeconds } from '../lib/utils'
import en from '../locals/en'
import { PUserDto } from '../user/dto/user.dto'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	public async login(user: User, res: Response) {
		return await this.generateTokens(user, res)
	}

	public async refresh(user: User, res: Response) {
		return await this.generateTokens(user, res)
	}

	public async validateUser(username: string, password: string) {
		const user = await this.userService.getUserByLogin(username, username)
		if (user) {
			const passwordEquals = await bcrypt.compare(password, user.password)
			if (passwordEquals) {
				if (!user.active)
					throw new UnauthorizedException({
						statusCode: HttpStatus.UNAUTHORIZED,
						message: en.messages.user_not_activated,
						error: 'messages.user_not_activated'
					})
				if (user.ban)
					throw new UnauthorizedException({
						statusCode: HttpStatus.UNAUTHORIZED,
						message: en.messages.user_banned,
						error: 'messages.user_banned'
					})
				return user
			} else {
				throw new UnauthorizedException({
					statusCode: HttpStatus.UNAUTHORIZED,
					message: en.messages.password_not_corrected,
					error: 'messages.password_not_corrected'
				})
			}
		} else {
			throw new UnauthorizedException({
				statusCode: HttpStatus.UNAUTHORIZED,
				message: en.messages.user_not_found,
				error: 'messages.login_user_not_found'
			})
		}
	}

	public async validatePayload(payload: any) {
		const decodedPayload = decodePayload(payload.data)
		if (decodedPayload.id) {
			const user = await this.userService.getUserById(
				decodedPayload.id,
				true
			)
			if (user && user.active && !user.ban) return user
		} else {
			const user = await this.userService.getUserByLogin(
				decodedPayload.phone,
				decodedPayload.email
			)
			if (user && !user.active) return user
		}
		throw new UnauthorizedException({
			statusCode: HttpStatus.UNAUTHORIZED,
			message: en.messages.user_not_activated,
			error: 'messages.user_not_activated'
		})
	}

	public async register(userDto: PUserDto) {
		const hashPassword = await bcrypt.hash(userDto.password, 5)
		const token = await this.jwtService.signAsync(
			{
				data: encodePayload({ emeil: userDto.email, phone: userDto.phone })
			},
			{
				expiresIn: process.env.JWT_REGISTER_EXPIRATION,
				secret: process.env.JWT_REGISTER_SECRET
			}
		)
		const user = await this.userService.createUser(
			{ ...userDto, password: hashPassword },
			'USER',
			token
		)
		return { phone: user.phone, email: user.email }
	}

	private async generateTokens(user: User, res?: Response) {
		const payload = {
			id: user.id,
			name: user.profile.name,
			avatar: user.profile.avatar
		}

		const accessToken = await this.jwtService.signAsync({
			data: encodePayload(payload)
		})
		const refreshToken = await this.jwtService.signAsync(
			{ data: encodePayload({ ...payload, sign: accessToken }) },
			{
				expiresIn: process.env.JWT_REFRESH_EXPIRATION,
				secret: process.env.JWT_REFRESH_SECRET
			}
		)

		res?.cookie(String(process.env.REFRESH_TOKEN_NAME), refreshToken, {
			httpOnly: true,
			maxAge: toMilliSeconds(String(process.env.JWT_REFRESH_EXPIRATION)),
			sameSite: 'lax',
			secure: true,
			path: '/'
		})

		return accessToken
	}
}
