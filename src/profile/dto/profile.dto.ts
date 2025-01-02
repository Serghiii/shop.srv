import { IsOptional, IsString, MaxLength } from 'class-validator'

export class ProfileDto {
	@MaxLength(50)
	@IsString()
	readonly name: string
	@MaxLength(1)
	@IsString()
	readonly gender: string
	@IsOptional()
	@IsString()
	readonly phone?: string
	@IsOptional()
	@IsString()
	readonly avatar?: string
}
