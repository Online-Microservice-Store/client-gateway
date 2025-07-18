import { Module } from '@nestjs/common';
import { SuscriptionsController } from './suscriptions.controller';
import { NatsModule } from 'src/nats/nats.module';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  controllers: [SuscriptionsController],
  providers: [],
  imports: [
    NatsModule,
    MetricsModule
  ]
})
export class SuscriptionsModule {}
