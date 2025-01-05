import { Module } from '@nestjs/common';
import { SuscriptionsController } from './suscriptions.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [SuscriptionsController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class SuscriptionsModule {}
