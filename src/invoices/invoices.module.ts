import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [InvoicesController],
  imports: [
    NatsModule
  ]
})
export class InvoicesModule {}
