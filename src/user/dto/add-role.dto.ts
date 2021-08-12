import { IsNumber, IsString, MaxLength } from "class-validator";

export class AddRoleDto {
   @MaxLength(20, { message: 'Максимальна довжина 20' })
   @IsString({ message: 'Повинно буди строкою' })
   readonly name: string;
   @IsNumber({}, { message: 'Повинно буди числом' })
   readonly userId: number;
}