import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	Res,
	UseGuards
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { Response } from 'express'
import { GoogleService } from '../google/google.service'
import { PUserDto } from '../user/dto/user.dto'
import { AuthService } from './auth.service'
import { DoesUserExist } from './does-user-exist.guard'
import { GoogleDto } from './dto/google.dto'
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private googleService: GoogleService
	) {}

	@Throttle({ short: { limit: 2, ttl: 1000 }, long: { limit: 5, ttl: 60000 } })
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@Post('/login')
	login(@Request() req: any, @Res({ passthrough: true }) res: Response) {
		return this.authService.login(req.user, res)
	}

	@Throttle({ short: { limit: 1, ttl: 1000 }, long: { limit: 2, ttl: 60000 } })
	@UseGuards(JwtRefreshAuthGuard)
	@Post('/refresh')
	refresh(@Request() req: any, @Res({ passthrough: true }) res: Response) {
		return this.authService.refresh(req.user, res)
	}

	@HttpCode(HttpStatus.CREATED)
	@UseGuards(DoesUserExist)
	@Post('/register')
	register(@Body() data: PUserDto) {
		return this.authService.register(data)
	}

	@HttpCode(HttpStatus.OK)
	@Post('/logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(String(process.env.REFRESH_TOKEN_NAME))
		return { message: 'Logout successful' }
	}

	@HttpCode(HttpStatus.OK)
	@Post('/google')
	async google(
		@Body() data: GoogleDto,
		@Res({ passthrough: true }) res: Response
	) {
		const user = await this.googleService.register(data.token)
		return this.authService.login(user, res)
	}
}
