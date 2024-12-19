import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(
       this.ordersClient.send('create_order', createOrderDto)
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
        this.ordersClient.send('find_all_orders', orderPaginationDto)
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
             this.ordersClient.send('find_one_order', {id})
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
      return this.ordersClient.send('find_all_orders', {
        ...paginationDto,
        status: statusDto.status,
      });      
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
      return this.ordersClient.send('change_order_status', {
        id,
        status: statusDto.status
      })
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
