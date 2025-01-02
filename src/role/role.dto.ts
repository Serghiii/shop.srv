import { IsString, MaxLength } from 'class-validator'

export class RoleDto {
	@MaxLength(20)
	@IsString()
	readonly name: string
	@IsString()
	readonly description: string
}
