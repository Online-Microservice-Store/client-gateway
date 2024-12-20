import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { NATS_SERVICE, ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(
       this.client.send('create_order', createOrderDto)
      );
      return order; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAllOrders(@Query() orderPaginationDto:OrderPaginationDto) {
    
    try {
      const order = await firstValueFrom(
        this.client.send('find_all_orders', orderPaginationDto)
      );

      return order; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('/id/:id')
  async findById(@Param('id', ParseUUIDPipe ) id: string) {
    try {
          const order = await firstValueFrom(
             this.client.send('find_one_order', {id})
          );
    
          return order; 
          
        } catch (error) {
          throw new RpcException(error);
        }
  }
  
  @Get(':status')
  async findByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto:PaginationDto,
  ) {
    try {
      const orders = await firstValueFrom(this.client.send('find_all_orders', {
        ...paginationDto,
        status: statusDto.status,
      })    
      );
      return orders;
    } catch (error) {
        throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id : string,
    @Body() statusDto: StatusDto
  ){
    try {
      return this.client.send('change_order_status', {
        id,
        status: statusDto.status
      })
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
