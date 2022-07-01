import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PropDetail } from './propdetail.entity';

@Injectable()
export class PropdetailService {
   constructor(@InjectRepository(PropDetail) private productRepository: Repository<PropDetail>) { }

   async getPropDetailIds(Ids: string[]) {
      return await this.productRepository.find({ where: { id: In(Ids) }, select: { id: true } })
   }
}
