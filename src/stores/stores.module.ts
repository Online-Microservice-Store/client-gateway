import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { NatsModule } from 'src/nats/nats.module';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  controllers: [StoresController],
  providers: [],
  imports: [
    NatsModule,
    MetricsModule
  ]
})
export class StoresModule {}
