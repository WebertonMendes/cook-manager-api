import { Injectable } from '@nestjs/common';

import { CreateProductDto } from '@/modules/products/dto/create-product.dto';
import { ProductResponseDto } from '@/modules/products/dto/product-response.dto';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaProductsMapper } from '../mappers/prisma-products-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ProductResponseDto | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) return null;

    return PrismaProductsMapper.toDto(product);
  }

  async create(data: CreateProductDto): Promise<void> {
    try {
      await this.prisma.product.create({ data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }
}
