import { IsString, IsArray, ArrayMinSize, ValidateNested } from "class-validator";
import { OrderDetailsDto } from "../orderdetails/orderdetails.dto";
import { Type } from "class-transformer";

export class OrderDto {

    @IsString({ message: 'Повинно буди строкою' })
    readonly details: string

    @IsArray({ message: 'Повинно буди массивом' })
    @ArrayMinSize(1, { message: 'Массив не має бути порожнім'})
    @ValidateNested({ each: true })
    @Type(() => OrderDetailsDto)
    readonly odetails: OrderDetailsDto[]
    
}