import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUserInterface } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient : ClientProxy
  ) {}

  @Post('register')
  registerUser(@Body() registerUser: RegisterUserDto){
    return this.natsClient.send('auth.register.user', registerUser)
    .pipe(
      catchError( error => {
        throw new RpcException(error);
      })
    );
  }
 
  @Post('login')
  login(@Body() loginUserDto : LoginUserDto){
    return this.natsClient.send('auth.login.user', loginUserDto)
    .pipe(
      catchError( error => {
        throw new RpcException(error);
      })
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user:CurrentUserInterface, @Token() token:string){
    // console.log(req.headers);
    return {user, token}
    // return this.natsClient.send('auth.verify.user', {});
  }


}
