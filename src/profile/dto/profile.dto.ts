import { IsOptional, IsString, Length, MaxLength } from "class-validator";

export class ProfileDto {
   @MaxLength(50, { message: 'Максимальна довжина 50' })
   @IsString({ message: 'Повинно буди строкою' })
   readonly name: string;
   @MaxLength(1, { message: 'Максимальна довжина 1' })
   @IsString({ message: 'Повинно буди строкою' })
   readonly gender: string;
   @IsOptional()
   @IsString({ message: 'Повинно буди строкою' })
   readonly phone?: string;
   @IsOptional()
   @IsString({ message: 'Повинно буди строкою' })
   readonly avatar?: string;
}