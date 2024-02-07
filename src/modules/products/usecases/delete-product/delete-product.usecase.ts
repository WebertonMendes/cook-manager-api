import { Injectable } from '@nestjs/common';

import { ProductNotFoundException } from '../../exceptions/product-not-found-exception';
import { ProductsRepository } from '../../repositories/products.repository';
import { OrderItemsRepository } from '@/modules/orders/order-items/repositories/order-items.repository';
import { ProductCannotDeletedException } from '../../exceptions/product-cannot-deleted-exception';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    private repository: ProductsRepository,
    private orderItemsRepository: OrderItemsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.validate(id);
    await this.repository.delete(id);
  }

  private async validate(id: string) {
    await this.validateProductExists(id);
    await this.validateProductExclusion(id);
  }

  private async validateProductExists(id: string) {
    const product = await this.repository.findById(id);
    if (!product) throw new ProductNotFoundException(id);
  }

  private async validateProductExclusion(id: string) {
    const items = await this.orderItemsRepository.findByProductId(id);
    if (items.length > 0) throw new ProductCannotDeletedException(id);
  }
}
