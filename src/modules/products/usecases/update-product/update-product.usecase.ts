import { Injectable } from '@nestjs/common';

import { UpdateProductDto } from '../../dto/update-product.dto';
import { ProductNotFoundException } from '../../exceptions/product-not-found-exception';
import { ProductsRepository } from '../../repositories/products.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(private repository: ProductsRepository) {}

  async execute(id: string, data: UpdateProductDto): Promise<void> {
    const product = await this.repository.findById(id);

    if (!product) throw new ProductNotFoundException(id);

    await this.repository.update(id, data);
  }
}
