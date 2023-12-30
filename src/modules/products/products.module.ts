import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CreateProductController } from './usecases/create-product/create-product.controller';
import { CreateProductUseCase } from './usecases/create-product/create-product.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController],
  providers: [CreateProductUseCase],
})
export class ProductsModule {}
