import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'
import { FirmController } from './firm.controller'
import { Firm } from './firm.entity'
import { FirmService } from './firm.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([Firm]),
		forwardRef(() => UserModule),
		JwtModule
	],
	exports: [FirmService],
	providers: [FirmService],
	controllers: [FirmController]
})
export class FirmModule {}
