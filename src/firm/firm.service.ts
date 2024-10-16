import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirmDto } from './firm.dto';
import { Firm } from './firm.entity';
import { UserService } from '../user/user.service';
import en from '../locals/en';

@Injectable()
export class FirmService {

   constructor(
      @InjectRepository(Firm) private firmRepository: Repository<Firm>,
      private userService: UserService
   ) { }

   async createFirm(dto: FirmDto) {
      return await this.firmRepository.save(dto);
   }

   async getFirmById(id:number) {
      return await this.firmRepository.findOneBy({id})
   }

   async getAllFirms(id:number) {
      return await this.userService.getUserFirmsById(id)
   }

   async getFirm(value: string, id:number) {
      const firm: Firm = (Number.isNaN(Number(value))
                     ?await this.firmRepository.findOneOrFail({ where: { name: value} })
                     :await this.firmRepository.findOneOrFail({ where: { ipn: Number(value)} }))
      const firms: Firm[] = (await this.userService.getUserFirmsById(id))
      const res = firms.some(f => (f.name==firm.name || f.ipn==firm.ipn))
      if (!res) throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: en.firm.firm_not_found }, HttpStatus.BAD_REQUEST);
      return firm
   }
 
}
