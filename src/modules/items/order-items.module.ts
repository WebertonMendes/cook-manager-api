import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { AddOrderItemController } from './usecases/add-order-item/add-order-item.controller';
import { AddOrderItemUseCase } from './usecases/add-order-item/add-order-item.usecase';
import { FindAllItemsByOrderIdController } from './usecases/find-all-items-by-order-id/find-all-items-by-order-id.controller';
import { FindAllItemsByOrderIdUseCase } from './usecases/find-all-items-by-order-id/find-all-items-by-order-id.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AddOrderItemController, FindAllItemsByOrderIdController],
  providers: [AddOrderItemUseCase, FindAllItemsByOrderIdUseCase],
})
export class OrderItemsModule {}
