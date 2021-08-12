import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfoModule } from '../productinfo/productinfo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductInfoModule
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }
