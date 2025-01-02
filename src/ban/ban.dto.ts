import { IsString } from 'class-validator'

export class BanDto {
	@IsString()
	readonly reason: string
	@IsString()
	userId: number
}
