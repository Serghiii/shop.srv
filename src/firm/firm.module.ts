import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirmService } from './firm.service';
import { FirmController } from './firm.controller';
import { Firm } from './firm.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Firm]),
    forwardRef(() => UserModule),
    JwtModule],
    exports: [FirmService],
    providers: [FirmService],
    controllers: [FirmController]
  })
export class FirmModule {}
