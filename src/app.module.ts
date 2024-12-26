import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './nats/nats.module';
import { AuthModule } from './auth/auth.module';
import { Orders2Module } from './orders2/orders2.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule, AuthModule, Orders2Module, InvoicesModule]
})
export class AppModule {}
