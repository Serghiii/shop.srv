import { IsInt, IsNumber, IsNumberString, IsString } from "class-validator"

export class OrderDetailsDto {

    @IsNumberString()
    readonly id: number

    @IsNumber()
    @IsInt()
    readonly code: number

    @IsString({ message: 'Повинно буди строкою' })
    readonly name: string

    @IsNumber()
    @IsInt()
    readonly amount: number

    @IsNumber()
    @IsInt()
    readonly sum: number

    @IsNumber()
    @IsInt()
    readonly discount: number

    @IsNumberString()
    readonly firmid: number

}