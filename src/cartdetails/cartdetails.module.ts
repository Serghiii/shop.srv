import { Module } from '@nestjs/common';
import { CartDetailsService } from './cartdetails.service';

@Module({
   providers: [CartDetailsService]
})
export class CartDetailsModule { }
