import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import { Auth, google } from 'googleapis'
import en from '../locals/en'
import { ExUserDto } from '../user/dto/user.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class GoogleService {
	oauthClient: Auth.OAuth2Client

	constructor(private userService: UserService) {
		this.oauthClient = new google.auth.OAuth2(
			process.env.GOOGLE_AUTH_CLIENT_ID,
			process.env.GOOGLE_AUTH_CLIENT_SECRET
		)
	}

	private async getUserData(token: string) {
		const userInfoClient = await google.oauth2('v2').userinfo
		this.oauthClient.setCredentials({
			access_token: token
		})
		const userInfoResponse = await userInfoClient.get({
			auth: this.oauthClient
		})
		return userInfoResponse.data
	}

	public async register(token: string) {
		const tokenInfo = await this.oauthClient.getTokenInfo(token)
		if (!tokenInfo.email_verified)
			throw new UnauthorizedException({
				statusCode: HttpStatus.UNAUTHORIZED,
				message: en.messages.user_not_verified,
				error: 'messages.user_not_verified'
			})
		const user = await this.userService.getUserByMail(
			tokenInfo.email ? tokenInfo.email : ''
		)
		if (user) {
			return user
		} else {
			const userInfo = await this.getUserData(token)
			const newUser: ExUserDto = {
				name: userInfo.name ? userInfo.name : '',
				phone: undefined,
				email: userInfo.email ? userInfo.email : '',
				password: await bcrypt.hash(randomUUID(), 5),
				avatar: userInfo.picture ? userInfo.picture : undefined
			}
			const user = await this.userService.createUser(newUser, 'USER')
			const user_by_email = await this.userService.getUserByMail(user.email)
			if (!user_by_email) {
				throw new HttpException(
					{
						statusCode: HttpStatus.NOT_FOUND,
						message: en.messages.user_not_found,
						error: 'messages.user_not_found'
					},
					HttpStatus.NOT_FOUND
				)
			}
			return user_by_email
		}
	}
}
