import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('notifications')
export class NotificationsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient : ClientProxy
  ) {}

  @Post()
  async createNotification(@Body() createNotificationDto : CreateNotificationDto){
    try {
      const notification = await firstValueFrom(
        this.natsClient.send('create_notification', createNotificationDto)
      );
      return notification
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAllNotification(@Query() paginationDto : PaginationDto){
    return this.natsClient.send('find_all_notifications', paginationDto);
  }

  @Get(':id')
  async findOneNotification(@Param('id') id :string){
    try {
      const notification = await firstValueFrom(
        this.natsClient.send('find_one_notification', {id})
      );
      return notification;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
    async deleteNotification(@Param('id') id:string){
      try {
        const notification = await firstValueFrom(
          this.natsClient.send('delete_notification', {id})
        );
  
        return notification; 
          
      } catch (error) {
        throw new RpcException(error);
      }
    }
      
  @Patch(':id')
  async updateNotification(
    @Param('id') id:string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ){
    try {
      const notification = await firstValueFrom(
        this.natsClient.send('update_notification', {id, ...updateNotificationDto})
      );
      return notification; 
          
    } catch (error) {
      throw new RpcException(error);
    }      
  }
}
