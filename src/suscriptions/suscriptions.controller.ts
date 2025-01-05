import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateSuscriptionDto, UpdateSuscriptionDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('suscriptions')
export class SuscriptionsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient : ClientProxy 
  ) {}

  @Post()
  async createSuscription(@Body() createSuscriptionDto : CreateSuscriptionDto){
    try {
      const suscription = await firstValueFrom(
      this.natsClient.send('create_suscription', createSuscriptionDto)
      );
      return suscription; 
          
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllSuscription(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('find_all_suscriptions', paginationDto);
  }

  @Get(':id')
  async findOneSuscription(@Param('id') id:string){
    try {
      const suscription = await firstValueFrom(
        this.natsClient.send('find_one_suscription', {id})
      );

      return suscription; 
      
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteSuscription(@Param('id') id:string){
    try {
      const suscription = await firstValueFrom(
        this.natsClient.send('delete_suscription', {id})
      );

      return suscription; 
        
    } catch (error) {
      throw new RpcException(error);
    }
  }
    
  @Patch(':id')
  async updateSuscription(
    @Param('id') id:string,
    @Body() updateSuscription: UpdateSuscriptionDto
  ){
    try {
      const suscription = await firstValueFrom(
        this.natsClient.send('update_suscription', {id, ...updateSuscription})
      );
      return suscription; 
          
    } catch (error) {
      throw new RpcException(error);
    }      
  }
}
