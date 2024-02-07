import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from '../../dto/create-order.dto';
import { DuplicateOrderException } from '../../exceptions/duplicate-order-exception';
import { OrdersRepository } from '../../repositories/orders.repository';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserNotFoundException } from '@/modules/users/exceptions/user-not-found-exception';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private repository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(order: CreateOrderDto): Promise<void> {
    await this.validate(order);
    await this.repository.create(order);
  }

  private async validate(order: CreateOrderDto) {
    await this.validateOrderExists(order.table, order.clientId);
    await this.validateUserExists(order.userId);
  }

  private async validateOrderExists(table: number, clientId: number) {
    const orderExists = await this.repository.checkExists({
      table,
      clientId,
      isFinished: false,
    });

    if (orderExists) throw new DuplicateOrderException(orderExists.id);
  }

  private async validateUserExists(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new UserNotFoundException(userId);
  }
}
