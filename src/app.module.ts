import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './nats/nats.module';
import { AuthModule } from './auth/auth.module';
import { Orders2Module } from './orders2/orders2.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { StocksModule } from './stocks/stocks.module';
import { StoresModule } from './stores/stores.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule, AuthModule, Orders2Module, InvoicesModule, CatalogsModule, StocksModule, StoresModule, SuscriptionsModule, NotificationsModule]
})
export class AppModule {}
