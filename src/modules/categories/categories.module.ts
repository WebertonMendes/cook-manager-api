import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CreateCategoryController } from './usecases/create-category/create-category.controller';
import { CreateCategoryUseCase } from './usecases/create-category/create-category.usecase';
import { DeleteCategoryController } from './usecases/delete-category/delete-category.controller';
import { DeleteCategoryUseCase } from './usecases/delete-category/delete-category.usecase';
import { FindUserByIdController } from './usecases/find-category-by-id/find-category-by-id.controller';
import { FindCategoryByIdUseCase } from './usecases/find-category-by-id/find-category-by-id.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCategoryController,
    DeleteCategoryController,
    FindUserByIdController,
  ],
  providers: [
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    FindCategoryByIdUseCase,
  ],
})
export class CategoriesModule {}
