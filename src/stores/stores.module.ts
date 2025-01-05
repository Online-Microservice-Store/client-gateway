import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [StoresController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class StoresModule {}
