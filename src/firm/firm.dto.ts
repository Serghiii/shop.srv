import { IsNumber, IsString, MaxLength } from 'class-validator'

export class FirmDto {
	@MaxLength(100)
	@IsString()
	readonly name: string
	@IsNumber()
	readonly ipn: number
}
