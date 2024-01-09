import { Injectable } from '@nestjs/common';

import { CategoryNotFoundException } from '@/modules/categories/exceptions/category-not-found-exception';
import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductsRepository } from '../../repositories/products.repository';
import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private repository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(product: CreateProductDto): Promise<void> {
    const category = await this.categoriesRepository.findById(
      product.categoryId,
    );

    if (!category) throw new CategoryNotFoundException(product.categoryId);

    await this.repository.create(product);
  }
}
