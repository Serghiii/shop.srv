import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Ban } from './ban.entity';

@Injectable()
export class BanService {
   constructor(@InjectRepository(Ban) private activationRepository: Repository<Ban>
   ) { }

   async createBan(user: User, reason: string) {
      await this.activationRepository.save({ user, reason });
   }

   async getBanByUserId(userid: number) {
      return await this.activationRepository.findOne({ where: { user: { id: userid } } });
   }

}
