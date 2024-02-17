import { Prisma } from '@prisma/client';

import { handleFormatFilters } from '@/infra/helpers/filters/formatFilters';
import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CreateProductDto } from '@/modules/products/dto/create-product.dto';
import { ListProductsResponseDto } from '@/modules/products/dto/list-products-response.dto';
import { ProductResponseDto } from '@/modules/products/dto/product-response.dto';
import { ProductsFilterOptionsDto } from '@/modules/products/dto/products-filter-options.dto';
import { UpdateProductDto } from '@/modules/products/dto/update-product.dto';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: ProductEntity[] = [];

  async findAll(
    filters: ProductsFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListProductsResponseDto> {
    const filter = handleFormatFilters({
      name: filters.name,
      categoryId: filters.categoryId,
      isActive: filters.isActive,
    });

    const filteredProducts = this.items.filter(
      (product) =>
        (!filter.name || product.name.includes(filters.name)) &&
        (!filter.categoryId || product.categoryId === filters.categoryId) &&
        (filter.isActive === undefined ||
          product.isActive === filters.isActive),
    );

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: filteredProducts.length,
    });

    return {
      data: filteredProducts.slice(0, pagination.take),
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
      isActive: data.isActive,
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

  async inactivate(id: string): Promise<void> {
    const product = this.items.filter((product) => product.id === id)[0];
    const inactiveProductsCategoryId = '50228d88-a780-4982-b844-c95c405cc290';

    product.categoryId = inactiveProductsCategoryId;
    product.imageUrl = null;
    product.isActive = false;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
