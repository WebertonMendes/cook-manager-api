import { Injectable } from '@nestjs/common';

import { ProductsRepository } from '../../repositories/products.repository';
import { ProductResponseDto } from '../../dto/product-response.dto';
import { ProductNotFoundException } from '../../exceptions/product-not-found-exception';

@Injectable()
export class FindProductByIdUseCase {
  constructor(private repository: ProductsRepository) {}

  async execute(id: string): Promise<ProductResponseDto> {
    const product = await this.repository.findById(id);

    if (!product) throw new ProductNotFoundException(id);

    return product;
  }
}
