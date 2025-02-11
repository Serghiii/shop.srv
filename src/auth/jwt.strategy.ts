import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:
				process.env.JWT_SECRET ||
				'pSHoZDNCauKwhSoDl2LcLZKnPVsYn9BuTSOtW7VlLA9FoEWTv1KaBOw9JAiKPkhFKgaObG6V9Zz7r1hTPtiuYwAs'
		})
	}
	async validate(payload: any) {
		return await this.authService.validatePayload(payload)
	}
}
