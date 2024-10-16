import {IsNumber, IsString, MaxLength } from "class-validator";

export class FirmDto {
   @MaxLength(100, { message: 'Максимальна довжина 100' })
   @IsString({ message: 'Повинно буди строкою' })
   readonly name: string;
   @IsNumber({}, { message: 'Повинно буди числом' })
   readonly ipn: number;
}