import { Injectable } from '@nestjs/common';

import { ProductNotFoundException } from '../../exceptions/product-not-found-exception';
import { ProductsRepository } from '../../repositories/products.repository';

@Injectable()
export class InactivateProductUseCase {
  constructor(private repository: ProductsRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.repository.findById(id);

    if (!product) throw new ProductNotFoundException(id);

    await this.repository.inactivate(id);
  }
}
