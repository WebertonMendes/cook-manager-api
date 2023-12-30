import { Injectable } from '@nestjs/common';

import { CreateProductDto } from '@/modules/products/dto/create-product.dto';
import { ProductsRepository } from '@/modules/products/repositories/products.repository';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<void> {
    try {
      await this.prisma.product.create({ data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }
}
