import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
