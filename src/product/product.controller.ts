import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
   constructor(private readonly productService: ProductService) { }

   @Get('/:value')
   async getAll(@Param('value') ref: string, @Query() q) {
      return await this.productService.getAll(ref, q);
   }

   @Get('/id/:value')
   async getOne(@Param('value') id: number, @Query() { ref }) {
      return await this.productService.getOne(id, ref);
   }

   @Get('/filter/:value')
   async filter(@Param('value') ref: string, @Query() q) {
      return await this.productService.getFilters(ref, q);
   }

   @Get('/new/:value')
   async getNewProducts(@Param('value') limit: number) {
      return await this.productService.getNewProducts(limit);
   }

   @Post('/cart')
   async getCarts(@Body() { data }) {
      return await this.productService.getCarts(data);
   }

}
