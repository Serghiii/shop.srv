import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Module({
   imports: [
      TypeOrmModule.forFeature([Profile]),
      FileModule
   ],
   exports: [ProfileService],
   providers: [ProfileService]
})
export class ProfileModule { }
