import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto';
import { MetricsService } from 'src/metrics/metrics.service';

@Controller('products')
export class ProductsController {
  constructor(
      @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
      private readonly metricsService: MetricsService, // Inyectar MetricsService
    ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto){
    try {
      const product = await firstValueFrom(
        this.natsClient.send({cmd: 'create_product'}, createProductDto)
      );
      return product; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    this.metricsService.incrementRequestCounter('api/products', 'GET', '200');
    return this.natsClient.send({cmd: 'find_all_products'}, paginationDto);
  }

  @Get('id/:id')
  async findOneProduct(@Param('id') id:string){
    try {
      const product = await firstValueFrom(
        this.natsClient.send({cmd: 'find_one_product'}, {id})
      );

      return product; 
      
    } catch (error) {
      throw new RpcException(error);
    }
    // return "Esta función regresa el producto" + id;
  }

  @Get('catalog/:id')
  async findProductsByCatalogId(
    @Param('id') id:string,
    @Query() paginationDto : PaginationDto
  ){
    try {
      const product = await firstValueFrom(
        this.natsClient.send({cmd: 'find_products_by_catalogId'}, {id, ...paginationDto})
      );

      return product; 
      
    } catch (error) {
      throw new RpcException(error);
    }
    // return "Esta función regresa el producto" + id;
  }

  @Get('name/:name')
  async findProductsByName(@Param('name') name:string){
    try {
      // this.metricsService.incrementRequestCounter('api/products/name/:name', 'GET', '200');

      const products = await firstValueFrom(
        this.natsClient.send({cmd: 'find_products_by_name'}, {name})
      );

      return products; 
      
    } catch (error) {
      throw new RpcException(error);
    }
    // return "Esta función regresa el producto" + id;
  }
  

  @Delete(':id')
  async deleteProduct(@Param('id') id:string){
    try {
      const product = await firstValueFrom(
        this.natsClient.send({cmd: 'delete_product'}, {id})
      );

      return product; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id:string,
    @Body() updateProductDto: UpdateProductDto
  ){
    try {
      const product = await firstValueFrom(
        this.natsClient.send({cmd: 'update_product'}, {id, ...updateProductDto})
      );
      return product; 
      
    } catch (error) {
      throw new RpcException(error);
    }
    
  }
}
