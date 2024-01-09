import { Prisma } from '@prisma/client';

import { CreateProductDto } from '@/modules/products/dto/create-product.dto';
import { ProductResponseDto } from '@/modules/products/dto/product-response.dto';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { ProductsFilterOptionsDto } from '@/modules/products/dto/products-filter-options.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { ListProductsResponseDto } from '@/modules/products/dto/list-products-response.dto';
import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { UpdateProductDto } from '@/modules/products/dto/update-product.dto';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: ProductEntity[] = [];

  async findAll(
    filters: ProductsFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListProductsResponseDto> {
    const products = this.items.filter(
      (products) =>
        products.name.includes(filters.name) ||
        products.categoryId === filters.categoryId ||
        products.isActive === filters.isActive,
    );

    const allProducts = this.items.slice(0, pagination.take);

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: products.length > 0 ? products.length : this.items.length,
    });

    return {
      data: products.length > 0 ? products : allProducts,
      pagination: paginationMeta,
    };
  }

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

  async update(id: string, data: UpdateProductDto): Promise<void> {
    const product = this.items.filter((product) => product.id === id)[0];

    Object.keys(data).map((dataKey) => {
      Object.keys(product).map((productKey) => {
        if (productKey === dataKey) product[productKey] = data[dataKey];
      });
    });
  }
}
