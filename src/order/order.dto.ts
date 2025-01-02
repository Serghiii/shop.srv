import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsString,
	ValidateNested
} from 'class-validator'
import { OrderDetailsDto } from '../orderdetails/orderdetails.dto'

export class OrderDto {
	@IsString()
	readonly details: string

	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => OrderDetailsDto)
	readonly odetails: OrderDetailsDto[]
}
