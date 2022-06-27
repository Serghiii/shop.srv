import { IsNotEmpty, IsString } from "class-validator";

export class GoogleDto {
   @IsNotEmpty()
   @IsString({ message: 'Повинно буди строкою' })
   readonly token: string;
}