import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirmService } from './firm.service';
import { FirmController } from './firm.controller';
import { Firm } from './firm.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Firm])],
    exports: [FirmService],
    providers: [FirmService],
    controllers: [FirmController]
  })
export class FirmModule {}
