import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupController } from './group.controller'
import { Group } from './group.entity'
import { GroupService } from './group.service'

@Module({
	imports: [TypeOrmModule.forFeature([Group])],
	exports: [GroupService],
	controllers: [GroupController],
	providers: [GroupService]
})
export class GroupModule {}
