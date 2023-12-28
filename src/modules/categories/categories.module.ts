import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CreateCategoryController } from './usecases/create-category/create-category.controller';
import { CreateCategoryUseCase } from './usecases/create-category/create-category.usecase';
import { FindUserByIdController } from './usecases/find-category-by-id/find-category-by-id.controller';
import { FindCategoryByIdUseCase } from './usecases/find-category-by-id/find-category-by-id.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCategoryController, FindUserByIdController],
  providers: [CreateCategoryUseCase, FindCategoryByIdUseCase],
})
export class CategoriesModule {}
