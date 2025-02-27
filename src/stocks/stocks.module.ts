import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [StocksController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class StocksModule {}
