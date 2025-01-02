import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'

@Injectable()
export class JwtRegisterStrategy extends PassportStrategy(
	Strategy,
	'jwt-register'
) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_REGISTER_SECRET
		})
	}
	async validate(payload: any) {
		return this.authService.validatePayload(payload)
	}
}
