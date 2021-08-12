import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ban } from './ban.entity';
import { BanService } from './ban.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ban]),
  ],
  exports: [BanService],
  providers: [BanService]
})
export class BanModule { }
