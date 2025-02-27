import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateEntity, LoginUserDto, RegisterUserDto } from './dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthGuardClient } from './guards/authClient.guard';
import { Token, User } from './decorators';
import { CurrentUserInterface } from './interfaces/current-user.interface';
import { PaginationDto } from 'src/common';
import { AuthGuardAdmin } from './guards/authAdmin.guard';
import { AuthGuardTrader } from './guards/authTrader.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient : ClientProxy
  ) {}
  // Register client
  @Post('registerClient')
  registerClient(@Body() createEntity : CreateEntity){
    return this.natsClient.send('auth.register.client', createEntity)
    .pipe(
      catchError( error => {
        throw new RpcException(error);
      })
    );
  }
  // Register trader
  @Post('registerTrader')
  registerTrader(@Body() createEntity : CreateEntity){
    return this.natsClient.send('auth.register.trader', createEntity)
    .pipe(
      catchError( error => {
        throw new RpcException(error);
      })
    );
  }
  // Register admin
  @Post('registerAdmin')
  registerAdmin(@Body() createEntity : CreateEntity){
    return this.natsClient.send('auth.register.admin', createEntity)
    .pipe(
      catchError( error => {
        throw new RpcException(error);
      })
    );
  }
  // Curso
  // @Post('register')
  // registerUser(@Body() registerUser: RegisterUserDto){
  //   return this.natsClient.send('auth.register.user', registerUser)
  //   .pipe(
  //     catchError( error => {
  //       throw new RpcException(error);
  //     })
  //   );
  // }
 
  @Post('login')
  login(@Body() loginUserDto : LoginUserDto){
    return this.natsClient.send('auth.login.user', loginUserDto)
    .pipe(
      catchError( error => {
        throw new RpcException(error);
      })
    );
  }

  @UseGuards(AuthGuardClient)
  @Get('verify')
  verifyToken(@User() user:CurrentUserInterface, @Token() token:string){
    // console.log(req.headers);
    return {user, token}
    // return this.natsClient.send('auth.verify.user', {});
  }

  //GET ALL
  @UseGuards(AuthGuardAdmin)
  @Get('get/Client')
  get_all_Clients(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('auth.find_all.client', paginationDto);
  }

  @UseGuards(AuthGuardAdmin)
  @Get('get/Trader')
  get_all_Traders(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('auth.find_all.trader', paginationDto);
  }

  @UseGuards(AuthGuardAdmin)
  @Get('get/Admin')
  get_all_Admins(@Query() paginationDto: PaginationDto){
    return this.natsClient.send('auth.find_all.admin', paginationDto);
  }

  //GET ONE
  @Get('/get/admin/:id')
  async get_one_admin(@Param('id' ) id: string){
    try {
      const admin = await firstValueFrom(
         this.natsClient.send('auth.find.one.admin', {id})
      );

      return admin; 

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('/get/trader/:id')
  async get_one_trader(@Param('id' ) id: string){
    try {
      const trader = await firstValueFrom(
         this.natsClient.send('auth.find.one.trader', {id})
      );

      return trader; 

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('/get/client/:id')
  async get_one_client(@Param('id' ) id: string){
    try {
      const client = await firstValueFrom(
         this.natsClient.send('auth.find.one.client', {id})
      );

      return client; 

    } catch (error) {
      throw new RpcException(error);
    }
  }
}
