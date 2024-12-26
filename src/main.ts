import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  console.log("Quinto Commit");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
    
  )
  app.useGlobalFilters(new RpcCustomExceptionFilter )
  app.listen(envs.port);

  logger.log('Gatewayyyyyy running on port ' + envs.port);
}
bootstrap();
