import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [CatalogsController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class CatalogsModule {}
