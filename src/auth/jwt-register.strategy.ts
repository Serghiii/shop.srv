import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'

@Injectable()
export class JwtRegisterStrategy extends PassportStrategy(
	Strategy,
	'jwt-register'
) {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:
				process.env.JWT_REGISTER_SECRET ||
				'pSHoZDNCauKwhSoDl2LcLZKnPdsYa9BuTSOkW7VlvA9FoEWTvoKaBOw9JAiKPkhFKxaObG6V9ZK7r1hTPtiuYwms'
		})
	}
	async validate(payload: any) {
		return this.authService.validatePayload(payload)
	}
}
