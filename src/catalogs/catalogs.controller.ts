import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateCatalogDto, UpdateCatalogDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { UpdateProductDto } from 'src/products/dto';

@Controller('catalogs')
export class CatalogsController {
  constructor(
      @Inject(NATS_SERVICE) private readonly natsClient : ClientProxy
  ) {}
  @Post()
  async createCatalog(@Body()  createCatalogDto : CreateCatalogDto){
    try {
      const catalog = await firstValueFrom(
        this.natsClient.send('create_catalog', createCatalogDto)
      );
      return catalog; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllCatalogs(@Query() paginationDto : PaginationDto){
    return this.natsClient.send('find_all_catalogs', paginationDto);
  }

  @Get(':id')
  async findOneCatalog(@Param('id') id: string){
    try {
      const catalog = await firstValueFrom(
        this.natsClient.send('find_one_catalog', {id})
      );

      return catalog; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteCatalog(@Param('id') id : string){
    try {
      const product = await firstValueFrom(
        this.natsClient.send('delete_ catalaog', {id})
      );

      return product; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateCatalog(
    @Param('id') id:string,
    @Body() updateCatalogDto: UpdateCatalogDto
  ){
    try {
      const newCatalog = {id, ...updateCatalogDto }
      console.log(newCatalog);
      return this.natsClient.send('update_catalog', newCatalog);
      
    } catch (error) {
      throw new RpcException(error);
    }
    
  }
}
