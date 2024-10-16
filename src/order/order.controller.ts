import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async createOrder(@Body() data: OrderDto) {
       return await this.orderService.createOrder(data)
    }
 
}