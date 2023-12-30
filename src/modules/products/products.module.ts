import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CreateProductController } from './usecases/create-product/create-product.controller';
import { CreateProductUseCase } from './usecases/create-product/create-product.usecase';
import { FindCategoryByIdController } from './usecases/find-product-by-id/find-product-by-id.controller';
import { FindProductByIdUseCase } from './usecases/find-product-by-id/find-product-by-id.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController, FindCategoryByIdController],
  providers: [CreateProductUseCase, FindProductByIdUseCase],
})
export class ProductsModule {}
