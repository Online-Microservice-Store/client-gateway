import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { NatsModule } from './nats/nats.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { StocksModule } from './stocks/stocks.module';
import { StoresModule } from './stores/stores.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule, AuthModule, OrdersModule, InvoicesModule, CatalogsModule, StocksModule, StoresModule, SuscriptionsModule, NotificationsModule, HealthCheckModule, MetricsModule]
})
export class AppModule {}
