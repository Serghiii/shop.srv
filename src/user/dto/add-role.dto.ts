import { IsNumber, IsString, MaxLength } from 'class-validator'

export class AddRoleDto {
	@MaxLength(20)
	@IsString()
	readonly name: string
	@IsNumber()
	readonly userId: number
}
