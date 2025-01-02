import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { GoogleModule } from '../google/google.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'
import { JwtRegisterStrategy } from './jwt-register.strategy'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
	imports: [
		forwardRef(() => UserModule),
		PassportModule,
		GoogleModule,
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: process.env.JWT_SECRET,
				signOptions: {
					expiresIn: process.env.JWT_EXPIRATION
				}
			})
		})
	],
	exports: [AuthService, JwtModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		JwtRegisterStrategy
	]
})
export class AuthModule {}
