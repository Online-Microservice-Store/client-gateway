import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateStoreClientDto, CreateStoreDto, CreateStoreInvoiceDto, CreateStoreTraderDto, UpdateStoreClientDto, UpdateStoreDto } from './dto';
import { PaginationDto } from 'src/common';
import { UpdateStoreTraderDto } from './dto/update-store-trader.dto';
import { UpdateStoreInvoiceDto } from './dto/update-store-invoice.dto';

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

  // ========================================
  //=============StoreInvoice=================
  // ========================================
  @Post('/storeInvoice')
  async createStoreInvoice(@Body() createStoreInvoiceDto : CreateStoreInvoiceDto){
    try {
       const storeInvoice = await firstValueFrom(
         this.natsClient.send('create_store_invoice', createStoreInvoiceDto)
       );
       return storeInvoice; 
       
     } catch (error) {
       throw new RpcException(error);
     }
  }

  @Get('/storeInvoice/all')
  findAllStoreInvoice(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('find_all_store_invoice', paginationDto);
  }

  @Get('/storeInvoice/:id')
  async findOneStoreInvoice(@Param('id') id:string){
    try {
      const storeInvoice = await firstValueFrom(
        this.natsClient.send('find_one_store_invoice', {id})
      );
      return storeInvoice; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('/storeInvoice/:id')
  async deleteStoreInvoice(@Param('id') id:string){
    try {
      const storeInvoice = await firstValueFrom(
        this.natsClient.send('delete_store_invoice', {id})
      );

      return storeInvoice; 
        
    } catch (error) {
      throw new RpcException(error);
    }
  }
    
  @Patch('/storeInvoice/:id')
  async updateStoreInvoice(
    @Param('id') id:string,
    @Body() updateStoreInvoiceDto: UpdateStoreInvoiceDto
  ){
    try {
      const storeInvoice = await firstValueFrom(
        this.natsClient.send('update_store_invoice', {id, ...updateStoreInvoiceDto})
      );
      return storeInvoice; 
          
    } catch (error) {
      throw new RpcException(error);
    }      
  }
}
