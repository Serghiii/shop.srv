import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Activation } from './activation.entity'

@Injectable()
export class ActivationService {
   constructor(
      @InjectRepository(Activation)
      private activationRepository: Repository<Activation>
   ) {}

   async getActivation(uuid: string) {
      return await this.activationRepository.findOneOrFail({
         select: {
            uuid: true
         },
         relations: {
            user: true
         }
      })
   }
}
