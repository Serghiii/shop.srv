import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch,
	Post,
	Put,
	Render,
	Request,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { JwtRegisterGuard } from '../auth/jwt-register.guard'
import { hasRole } from '../auth/role.decorator'
import { BanDto } from '../ban/ban.dto'
import { ProfileDto } from '../profile/dto/profile.dto'
import { ProfileService } from '../profile/profile.service'
import { AddRoleDto } from './dto/add-role.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly profileService: ProfileService
	) {}

	@UseGuards(JwtRegisterGuard)
	@Get('/activate/:value')
	@Render('registered') // підключення шаблонізатора
	async activate(@Request() req: any) {
		const user = await this.userService.activateUser(req.user)
		return { mail: user.email, phone: user.phone }
	}

	@hasRole('USER')
	@Get()
	@UseInterceptors(ClassSerializerInterceptor) // виключити пароль із відповіді
	async getAll() {
		return await this.userService.getAllUsers()
	}

	@hasRole('USER')
	@HttpCode(HttpStatus.OK)
	@Post('/profile')
	@UseInterceptors(ClassSerializerInterceptor) // виключити пароль із відповіді
	async getUserProfile(@Request() req: any) {
		return await this.userService.getUserProfileById(req.user.id)
	}

	@hasRole('USER')
	@Patch('/changepassword')
	@UseInterceptors(ClassSerializerInterceptor) // виключити пароль із відповіді
	async changePassword(@Request() req: any, @Body() { password }: any) {
		return await this.userService.updateUserPassword(req.user.id, password)
	}

	@hasRole('USER')
	@Put('/changeprofile')
	async changeProfile(@Request() req: any, @Body() profile: ProfileDto) {
		if (profile.phone)
			await this.userService.updateUserPhone(req.user.id, profile.phone)
		return await this.profileService.updateProfile(
			req.user.profile.id,
			profile
		)
	}

	@hasRole('USER')
	@Patch('/changeavatar')
	async changeAvatar(@Request() req: any, @Body() profile: any) {
		return await this.profileService.updateAvatar(
			req.user.profile.id,
			profile.avatar
		)
	}

	@hasRole('ADMIN')
	@Post('/role')
	async addRole(@Body() dto: AddRoleDto) {
		return await this.userService.addRole(dto)
	}

	@hasRole('ADMIN')
	@Post('/ban')
	async ban(@Body() dto: BanDto) {
		return await this.userService.ban(dto)
	}
}
