import { IsString } from "class-validator";

export class BanDto {
   @IsString({ message: 'Повинно буди строкою' })
   readonly reason: string;
   @IsString({ message: 'Повинно буди строкою' })
   userId: number;
}