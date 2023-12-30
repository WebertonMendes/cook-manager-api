import { Prisma } from '@prisma/client';

import { CreateProductDto } from '@/modules/products/dto/create-product.dto';
import { ProductResponseDto } from '@/modules/products/dto/product-response.dto';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: ProductEntity[] = [];

  async findById(id: string): Promise<ProductResponseDto | null> {
    const product = this.items.find((item) => item.id === id);

    if (!product) return null;

    return product;
  }

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
