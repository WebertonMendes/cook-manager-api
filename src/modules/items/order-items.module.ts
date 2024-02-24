import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { OrdersModule } from '../orders/orders.module';
import { AddOrderItemController } from './usecases/add-order-item/add-order-item.controller';
import { AddOrderItemUseCase } from './usecases/add-order-item/add-order-item.usecase';
import { DeleteOrderItemController } from './usecases/delete-order-item/delete-order-item.controller';
import { DeleteOrderItemUseCase } from './usecases/delete-order-item/delete-order-item.usecase';
import { FindAllItemsByOrderIdController } from './usecases/find-all-items-by-order-id/find-all-items-by-order-id.controller';
import { FindAllItemsByOrderIdUseCase } from './usecases/find-all-items-by-order-id/find-all-items-by-order-id.usecase';
import { UpdateOrderItemController } from './usecases/update-order-item/update-order-item.controller';
import { UpdateOrderItemUseCase } from './usecases/update-order-item/update-order-item.usecase';

@Module({
  imports: [DatabaseModule, OrdersModule],
  controllers: [
    AddOrderItemController,
    FindAllItemsByOrderIdController,
    UpdateOrderItemController,
    DeleteOrderItemController,
  ],
  providers: [
    AddOrderItemUseCase,
    FindAllItemsByOrderIdUseCase,
    UpdateOrderItemUseCase,
    DeleteOrderItemUseCase,
  ],
})
export class OrderItemsModule {}
