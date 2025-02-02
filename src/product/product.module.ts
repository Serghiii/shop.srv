import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductInfoModule } from '../productinfo/productinfo.module'
import { ProductController } from './product.controller'
import { Product } from './product.entity'
import { ProductService } from './product.service'

@Module({
	imports: [TypeOrmModule.forFeature([Product]), ProductInfoModule],
	exports: [ProductService],
	providers: [ProductService],
	controllers: [ProductController]
})
export class ProductModule {}
