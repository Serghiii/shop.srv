import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Order } from './order.entity';
import { OrderDetails } from '../orderdetails/orderdetails.entity';
import en from '../locals/en';
import { OrderDto } from './order.dto';
import { Firm } from '../firm/firm.entity';

@Injectable()
export class OrderService {

    constructor(
        @InjectDataSource() private datasource: DataSource,
    ) {}

    async createOrder(data:OrderDto) {
        try {
            return await this.datasource.transaction(async manager => {
                const order = manager.create(Order)
                order.details = data.details
                const res = await manager.save(order)
                for (const item of data.odetails) {
                    const orderdetails = manager.create(OrderDetails);
                    orderdetails.code = item.code
                    orderdetails.name = item.name
                    orderdetails.amount = item.amount
                    orderdetails.sum = item.sum
                    orderdetails.discount = item.discount
                    orderdetails.firm = { id: item.firmid } as Firm
                    orderdetails.order = res
                    await manager.save(orderdetails)
                }
               return res
            });
        } catch (e) {
            throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: en.messages.create_order_error, error: 'messages.create_order_error' }, HttpStatus.BAD_REQUEST);
        }
    }
}
