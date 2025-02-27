import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Cambia esto según tu configuración. Usa '*' para permitir cualquier origen (no recomendado en producción).
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.setGlobalPrefix('api', {
    exclude: [{
      path: '',
      method: RequestMethod.GET,
    }]
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
    
  )
  app.useGlobalFilters(new RpcCustomExceptionFilter )
  app.listen(envs.port);
  console.log("Health check configured");
  logger.log('Gatewayrunning on port ' + envs.port);
}
bootstrap();
