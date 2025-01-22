import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateStoreClientDto, CreateStoreDto, CreateStoreTraderDto, UpdateStoreClientDto, UpdateStoreDto } from './dto';
import { PaginationDto } from 'src/common';
import { UpdateStoreTraderDto } from './dto/update-store-trader.dto';
import { AuthGuardClient } from 'src/auth/guards/authClient.guard';
import { AuthGuardTrader } from 'src/auth/guards/authTrader.guard';

@Controller('stores')
export class StoresController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient : ClientProxy
  ) {}

  @Post()
  async createStore(@Body() createStoreDto : CreateStoreDto){
       try {
          const store = await firstValueFrom(
            this.natsClient.send('create_store', createStoreDto)
          );
          return store; 
          
        } catch (error) {
          throw new RpcException(error);
        }
  }

 @Get()
  findAllStocks(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('find_all_stores', paginationDto);
  }

  @Get(':id')
  async findOneStore(@Param('id') id:string){
    try {
      const store = await firstValueFrom(
        this.natsClient.send('find_one_store', {id})
      );

      return store; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteStore(@Param('id') id:string){
    try {
      const store = await firstValueFrom(
        this.natsClient.send('delete_store', {id})
      );

      return store; 
        
    } catch (error) {
      throw new RpcException(error);
    }
  }
    
  @Patch(':id')
  async updateStore(
    @Param('id') id:string,
    @Body() updateStoreDto: UpdateStoreDto
  ){
    try {
      const store = await firstValueFrom(
        this.natsClient.send('update_store', {id, ...updateStoreDto})
      );
      return store; 
          
    } catch (error) {
      throw new RpcException(error);
    }      
  }

  // Aqui van a ir todas las relaciones muchos a muchos de que asocia a la clase store
  // ========================================
  //=============StoreTrader=================
  // ========================================
  @Post('/storeTrader')
  async createStoreTrader(@Body() createStoreTraderDto : CreateStoreTraderDto){
    try {
       const storeTrader = await firstValueFrom(
         this.natsClient.send('create_store_trader', createStoreTraderDto)
       );
       return storeTrader; 
       
     } catch (error) {
       throw new RpcException(error);
     }
  }

  @Get('/storeTrader/all')
  findAllStoreTrader(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('find_all_store_trader', paginationDto);
  }

  @Get('/storeTrader/:id')
  async findOneStoreTrader(@Param('id') id:string){
    try {
      const storeTrader = await firstValueFrom(
        this.natsClient.send('find_one_store_trader', {id})
      );
      return storeTrader; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('/storeTrader/:id')
  async deleteStoreTrader(@Param('id') id:string){
    try {
      const storeTrader = await firstValueFrom(
        this.natsClient.send('delete_store_trader', {id})
      );

      return storeTrader; 
        
    } catch (error) {
      throw new RpcException(error);
    }
  }
    
  @Patch('/storeTrader/:id')
  async updateStoreTrader(
    @Param('id') id:string,
    @Body() updateStoreTraderDto: UpdateStoreTraderDto
  ){
    try {
      const storeTrader = await firstValueFrom(
        this.natsClient.send('update_store_trader', {id, ...updateStoreTraderDto})
      );
      return storeTrader; 
          
    } catch (error) {
      throw new RpcException(error);
    }      
  }

  @UseGuards(AuthGuardTrader)
  @Get('/storeTrader/trader/:id')
  async getStoresByTraderId(
    @Param('id') id : string,
    @Query() paginationDto: PaginationDto
  ){
    try {
      const stores = await firstValueFrom(
        this.natsClient.send('get_stores_by_tarderId', {id, ...paginationDto})
      );
      return stores; 
          
    } catch (error) {
      throw new RpcException(error);
    } 
  }
  // ========================================
  //=============StoreClient=================
  // ========================================
  @Post('/storeClient')
  async createStoreClient(@Body() createStoreClientDto : CreateStoreClientDto){
    try {
       const storeClient = await firstValueFrom(
         this.natsClient.send('create_store_client', createStoreClientDto)
       );
       return storeClient; 
       
     } catch (error) {
       throw new RpcException(error);
     }
  }

  @Get('/storeClient/all')
  findAllStoreClient(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('find_all_store_client', paginationDto);
  }

  @Get('/storeClient/:id')
  async findOneStoreClient(@Param('id') id:string){
    try {
      const storeClient = await firstValueFrom(
        this.natsClient.send('find_one_store_client', {id})
      );
      return storeClient; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('/storeClient/store/:id')
  async getClientsByStoreId(@Param('id') id:string){
    try {
      const clients = await firstValueFrom(
        this.natsClient.send('get_StoreClient_By_StoreId', {id})
      );
      return clients; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('/storeClient/:id')
  async deleteStoreClient(@Param('id') id:string){
    try {
      const storeClient = await firstValueFrom(
        this.natsClient.send('delete_store_client', {id})
      );

      return storeClient; 
        
    } catch (error) {
      throw new RpcException(error);
    }
  }
    
  @Patch('/storeClient/:id')
  async updateStoreClient(
    @Param('id') id:string,
    @Body() updateStoreClientDto: UpdateStoreClientDto
  ){
    try {
      const storeClient = await firstValueFrom(
        this.natsClient.send('update_store_client', {id, ...updateStoreClientDto})
      );
      return storeClient; 
          
    } catch (error) {
      throw new RpcException(error);
    }      
  }


}
