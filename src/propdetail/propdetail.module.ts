import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PropdetailController } from './propdetail.controller'
import { PropDetail } from './propdetail.entity'
import { PropdetailService } from './propdetail.service'

@Module({
	imports: [TypeOrmModule.forFeature([PropDetail])],
	exports: [PropdetailService],
	controllers: [PropdetailController],
	providers: [PropdetailService]
})
export class PropdetailModule {}
