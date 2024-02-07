import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CreateProductController } from './usecases/create-product/create-product.controller';
import { CreateProductUseCase } from './usecases/create-product/create-product.usecase';
import { DeleteProductController } from './usecases/delete-product/delete-product.controller';
import { DeleteProductUseCase } from './usecases/delete-product/delete-product.usecase';
import { FindAllProductsController } from './usecases/find-all-products/find-all-products.controller';
import { FindAllProductsUseCase } from './usecases/find-all-products/find-all-products.usecase';
import { FindCategoryByIdController } from './usecases/find-product-by-id/find-product-by-id.controller';
import { FindProductByIdUseCase } from './usecases/find-product-by-id/find-product-by-id.usecase';
import { InactivateProductController } from './usecases/inactivate-product/inactivate-product.controller';
import { InactivateProductUseCase } from './usecases/inactivate-product/inactivate-product.usecase';
import { UpdateProductController } from './usecases/update-product/update-product.controller';
import { UpdateProductUseCase } from './usecases/update-product/update-product.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductController,
    FindCategoryByIdController,
    FindAllProductsController,
    UpdateProductController,
    InactivateProductController,
    DeleteProductController,
  ],
  providers: [
    CreateProductUseCase,
    FindProductByIdUseCase,
    FindAllProductsUseCase,
    UpdateProductUseCase,
    InactivateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductsModule {}
