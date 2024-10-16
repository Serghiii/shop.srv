import { Module } from '@nestjs/common';
import { SubGroupService } from './subgroup.service';
import { SubgroupController } from './subgroup.controller';
import { SubGroup } from './subgroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubGroup]),
  ],
  exports: [
    SubGroupService
  ],
  providers: [SubGroupService],
  controllers: [SubgroupController]
})
export class SubgroupModule {}
