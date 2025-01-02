import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'

const cookieExtractor = (req: Request) => {
	let token = null
	if (req && req.cookies) {
		token = req.cookies[String(process.env.REFRESH_TOKEN_NAME)]
	}
	return token
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_REFRESH_SECRET,
			passReqToCallback: false
		})
	}
	async validate(payload: any) {
		return await this.authService.validatePayload(payload)
	}
}
