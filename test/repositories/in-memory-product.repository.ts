import { Prisma } from '@prisma/client';

import { CreateProductDto } from '@/modules/products/dto/create-product.dto';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: ProductEntity[] = [];

  async create(data: CreateProductDto): Promise<void> {
    const product = new ProductEntity({
      name: data.name,
      description: data.description,
      price: new Prisma.Decimal(data.price),
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
    });

    this.items.push(product);
  }
}
