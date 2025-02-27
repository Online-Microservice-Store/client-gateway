import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client:ClientProxy
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto : CreateOrderDto){
    console.log('dentro de orders ');
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

  @Get('/client/:id')
  async findOrdersByUserId(
    @Param('id') id:string,
    @Query() paginationDto: PaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('find_orders_by_clientId', {id, ...paginationDto})
      );
      return orders
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('/store/:id')
  async findOrdersByStoreId(
    @Param('id') id:string,
    @Query() paginationDto: PaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('find_orders_by_storeId', {id, ...paginationDto})
      );
      return orders
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
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
