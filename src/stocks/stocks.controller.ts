import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateStockDto } from 'src/products/dto';
import { UpdateStockDto } from 'src/products/dto/update-stock.dto';
import { UpdateStockAmountDto } from 'src/products/dto/update-stockAmount';

@Controller('stocks')
export class StocksController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient : ClientProxy
  ){}

  @Post()
  async createStock(@Body() createStockDto : CreateStockDto){
     try {
        const stock = await firstValueFrom(
          this.natsClient.send('create_stock', createStockDto)
        );
        return stock; 
        
      } catch (error) {
        throw new RpcException(error);
      }
  }

  @Get()
  findAllStocks(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('find_all_stocks', paginationDto);
  }

  @Get(':id')
  async findOneStock(@Param('id') id:string){
    try {
      const stock = await firstValueFrom(
        this.natsClient.send('find_one_stock', {id})
      );

      return stock; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('product/:id')
  async findStocksByProductId(
    @Param('id') id:string,
    @Query() paginationDto : PaginationDto
  ){
    try {
      const stocks = await firstValueFrom(
        this.natsClient.send('find_stocks_by_productId', {id, ...paginationDto})
      );

      return stocks; 
      
    } catch (error) {
      throw new RpcException(error);
    }
    // return "Esta función regresa el producto" + id;
  }

  @Delete(':id')
    async deleteStock(@Param('id') id:string){
      try {
        const stock = await firstValueFrom(
          this.natsClient.send('delete_stock', {id})
        );
  
        return stock; 
        
      } catch (error) {
        throw new RpcException(error);
      }
    }
  
    @Patch(':id')
    async updateStock(
      @Param('id') id:string,
      @Body() updateStockDto: UpdateStockDto
    ){
      try {
        const stock = await firstValueFrom(
          this.natsClient.send('update_stock', {id, ...updateStockDto})
        );
        return stock; 
        
      } catch (error) {
        throw new RpcException(error);
      }
    }
    @Patch('quantity/:id')
    async updateAmountStock(
      @Param('id') id:string,
      @Body() body: UpdateStockAmountDto
    ){
      try {
        const stock = await firstValueFrom(
          this.natsClient.send('update_stock_quantity', {id, ...body})
        );
        return stock; 
        
      } catch (error) {
        throw new RpcException(error);
      }
    }
}
