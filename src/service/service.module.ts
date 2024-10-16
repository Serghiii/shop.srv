import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { SubgroupModule } from '../subgroup/subgroup.module';
import { GroupModule } from '../group/group.module';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';

@Module({
    imports: [ CategoryModule, GroupModule, SubgroupModule, ProductModule ],
    providers: [ServiceService],
    controllers: [ServiceController]
})
export class ServiceModule {}
