import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirmDto } from './firm.dto';
import { Firm } from './firm.entity';

@Injectable()
export class FirmService {

    constructor(@InjectRepository(Firm) private firmRepository: Repository<Firm>) { }

    async createFirm(dto: FirmDto) {
       const firm = await this.firmRepository.save(dto);
       return firm;
    }
 
    async getFirm(value: string) {
        const firm = (Number.isNaN(Number(value))
                        ?await this.firmRepository.findOneOrFail({ where: { name: value} })
                        :await this.firmRepository.findOneOrFail({ where: { ipn: Number(value)} }))
        return firm;
     }
 
}
