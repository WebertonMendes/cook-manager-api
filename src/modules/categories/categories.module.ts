import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CreateCategoryController } from './usecases/create-category/create-category.controller';
import { CreateCategoryUseCase } from './usecases/create-category/create-category.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCategoryController],
  providers: [CreateCategoryUseCase],
})
export class CategoriesModule {}
