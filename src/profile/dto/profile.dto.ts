import { IsOptional, IsString, MaxLength } from 'class-validator'
import { EnumGender } from '../profile.entity'

export class ProfileDto {
	@MaxLength(50)
	@IsString()
	readonly name: string
	@MaxLength(1)
	@IsString()
	readonly gender: EnumGender
	@IsOptional()
	@IsString()
	readonly phone?: string
	@IsOptional()
	@IsString()
	readonly avatar?: string
}
