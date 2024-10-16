import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirmService } from './firm.service';
import { FirmController } from './firm.controller';
import { Firm } from './firm.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Firm]),
    JwtModule],
    exports: [FirmService],
    providers: [FirmService],
    controllers: [FirmController]
  })
export class FirmModule {}
