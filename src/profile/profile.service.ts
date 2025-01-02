import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import { DataSource, Repository } from 'typeorm'
import { ProfileDto } from './dto/profile.dto'
import { Profile } from './profile.entity'
import { FileService } from '../file/file.service'
import en from '../locals/en'

@Injectable()
export class ProfileService {
   constructor(
      @InjectDataSource() private datasource: DataSource,
      @InjectRepository(Profile) private profileRepository: Repository<Profile>,
      private fileService: FileService
   ) {}

   async updateProfile(id: number, dto: ProfileDto): Promise<Profile | null> {
      try {
         const profile = await this.profileRepository.findOne({
            where: { id }
         })
         if (profile) {
            profile.name = dto.name
            profile.gender = dto.gender
            if (dto.avatar) profile.avatar = dto.avatar
            await this.profileRepository.save(profile)
         }
         return profile
      } catch (e) {
         throw new HttpException(
            {
               statusCode: HttpStatus.BAD_REQUEST,
               message: en.profile.update_error,
               error: 'profile.update_error'
            },
            HttpStatus.BAD_REQUEST
         )
      }
   }

   async updateAvatar(id: number, data: string): Promise<Profile | null> {
      try {
         return await this.datasource.transaction(async (manager) => {
            const profile = await manager.findOne(Profile, { where: { id } })
            if (profile) {
               if (
                  !profile?.avatar ||
                  profile.avatar.includes('lh3.googleusercontent.com')
               ) {
                  profile.avatar = randomUUID() + '.jpg'
                  await manager.save(profile)
               }
               await this.fileService.writeFile(
                  profile.avatar,
                  'static/avatars',
                  Buffer.from(data, 'base64')
               )
            }
            return profile
         })
      } catch (e) {
         throw new HttpException(
            {
               statusCode: HttpStatus.BAD_REQUEST,
               message: en.profile.update_error,
               error: 'profile.update_error'
            },
            HttpStatus.BAD_REQUEST
         )
      }
   }
}
