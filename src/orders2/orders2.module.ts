import { Module } from '@nestjs/common';
import { Orders2Controller } from './orders2.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [Orders2Controller],
  imports: [
    NatsModule
  ]
})
export class Orders2Module {}
