import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/nats/nats.module';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule,
    MetricsModule
  ]
})
export class ProductsModule {}
