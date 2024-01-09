import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriesModule, ProductsModule, UsersModule],
})
export class HttpModule {}
