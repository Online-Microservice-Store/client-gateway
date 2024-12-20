import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
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
    return this.natsClient.send({cmd: 'find_all_products'}, paginationDto);
  }

  @Get(':id')
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
    @Param('id', ParseIntPipe) id:number ,
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
