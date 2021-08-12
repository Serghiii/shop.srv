import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activation } from './activation.entity';

@Injectable()
export class ActivationService {
   constructor(@InjectRepository(Activation) private activationRepository: Repository<Activation>
   ) { }

   async getActivation(uuid: string) {
      //update return await this.activationRepository.findOne(uuid, { relations: ['user'] });
      return await this.activationRepository.findOne({
         select: {
            uuid: true,
         },
         relations: {
            user: true
         }
      });
   }

}
