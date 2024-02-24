import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CreateOrdersController } from './usecases/create-order/create-order.controller';
import { CreateOrderUseCase } from './usecases/create-order/create-order.usecase';
import { DeleteOrderController } from './usecases/delete-order/delete-order.controller';
import { DeleteOrderUseCase } from './usecases/delete-order/delete-order.usecase';
import { FindAllOrdersController } from './usecases/find-all-orders/find-all-orders.controller';
import { FindAllOrdersUseCase } from './usecases/find-all-orders/find-all-orders.usecase';
import { FindOrderByIdController } from './usecases/find-order-by-id/find-order-by-id.controller';
import { FindOrderByIdUseCase } from './usecases/find-order-by-id/find-order-by-id.usecase';
import { UpdateOrderController } from './usecases/update-order/update-order.controller';
import { UpdateOrderUseCase } from './usecases/update-order/update-order.usecase';
import { RefreshOrderPriceUseCase } from './usecases/refresh-order-price/refresh-order-price.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateOrdersController,
    FindOrderByIdController,
    FindAllOrdersController,
    UpdateOrderController,
    DeleteOrderController,
  ],
  providers: [
    CreateOrderUseCase,
    FindOrderByIdUseCase,
    FindAllOrdersUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    RefreshOrderPriceUseCase,
  ],
  exports: [RefreshOrderPriceUseCase],
})
export class OrdersModule {}
