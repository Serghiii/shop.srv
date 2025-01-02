import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class UserDto {
	@MaxLength(50)
	@IsString()
	readonly name: string
	@MaxLength(13)
	@IsString()
	readonly phone?: string
	@MaxLength(50)
	@IsString()
	@IsEmail()
	readonly email: string
	@IsString()
	@MinLength(6)
	readonly password: string
}

export class ExUserDto extends UserDto {
	@IsString()
	avatar?: string
}

export class PUserDto extends UserDto {
	@IsString()
	activation_on: string
	@IsString()
	activation_ref: string
}
