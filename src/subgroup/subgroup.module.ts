import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubgroupController } from './subgroup.controller'
import { SubGroup } from './subgroup.entity'
import { SubGroupService } from './subgroup.service'

@Module({
	imports: [TypeOrmModule.forFeature([SubGroup])],
	exports: [SubGroupService],
	providers: [SubGroupService],
	controllers: [SubgroupController]
})
export class SubgroupModule {}
