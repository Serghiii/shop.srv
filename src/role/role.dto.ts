import { IsString, MaxLength } from "class-validator";

export class RoleDto {
   @MaxLength(20, { message: 'Максимальна довжина 20' })
   @IsString({ message: 'Повинно буди строкою' })
   readonly name: string;
   @IsString({ message: 'Повинно буди строкою' })
   readonly description: string;
}