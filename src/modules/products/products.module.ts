import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CreateProductController } from './usecases/create-product/create-product.controller';
import { CreateProductUseCase } from './usecases/create-product/create-product.usecase';
import { FindAllProductsController } from './usecases/find-all-products/find-all-products.controller';
import { FindAllProductsUseCase } from './usecases/find-all-products/find-all-products.usecase';
import { FindCategoryByIdController } from './usecases/find-product-by-id/find-product-by-id.controller';
import { FindProductByIdUseCase } from './usecases/find-product-by-id/find-product-by-id.usecase';
import { UpdateProductController } from './usecases/update-product/update-product.controller';
import { UpdateProductUseCase } from './usecases/update-product/update-product.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductController,
    FindCategoryByIdController,
    FindAllProductsController,
    UpdateProductController,
  ],
  providers: [
    CreateProductUseCase,
    FindProductByIdUseCase,
    FindAllProductsUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductsModule {}
