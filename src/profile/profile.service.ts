import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './profile.entity';
import { FileService } from '../file/file.service';
import { translate } from '../locales/translate';

@Injectable()
export class ProfileService {
   constructor(
      //update @InjectConnection() private connection: Connection,
      @InjectDataSource() private datasource: DataSource,
      @InjectRepository(Profile) private profileRepository: Repository<Profile>,
      private fileService: FileService,
   ) { }

   async updateProfile(id: number, dto: ProfileDto, lang: string = 'uk'): Promise<Profile> {
      try {
         //update const profile = await this.profileRepository.findOne(id);
         const profile = await this.profileRepository.findOne({ where: { id } });
         profile.name = dto.name;
         profile.gender = dto.gender;
         if (dto.avatar) profile.avatar = dto.avatar;
         await this.profileRepository.save(profile);
         return profile;
      } catch (e) {
         throw new HttpException(translate('profile.update_error', lang), HttpStatus.BAD_REQUEST);
      }
   }

   async updateAvatar(id: number, data: string, lang: string = 'uk'): Promise<Profile> {
      try {
         return await this.datasource.transaction(async manager => {
            //update const profile = await manager.findOne(Profile, id);
            const profile = await manager.findOne(Profile, { where: { id } });
            if (!profile.avatar || profile.avatar.includes('lh3.googleusercontent.com')) {
               profile.avatar = await randomUUID() + '.jpg';
               await manager.save(profile);
            }
            await this.fileService.writeImage(profile.avatar, 'static/avatars', data, lang)
            return profile;
         })
      } catch (e) {
         throw new HttpException(translate('profile.update_error', lang), HttpStatus.BAD_REQUEST);
      }
   }
}