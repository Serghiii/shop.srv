import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator'

export class LoginDto {
	@IsString()
	readonly username: string
	@MinLength(6)
	// @IsStrongPassword({
	// 	minLength: 8,
	// 	minLowercase: 1,
	// 	minNumbers: 1,
	// 	minSymbols: 1,
	// 	minUppercase: 1
	// })
	@IsString()
	readonly password: string
	@IsOptional()
	@IsBoolean()
	readonly rememberme?: boolean
}
