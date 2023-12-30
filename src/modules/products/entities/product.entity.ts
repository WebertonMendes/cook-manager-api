import { Product, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export class ProductEntity implements Product {
  id: string;
  name: string;
  description: string | null;
  price: Prisma.Decimal;
  imageUrl: string | null;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(product?: Partial<ProductEntity>) {
    this.id = product.id ? product.id : randomUUID();
    this.name = product?.name;
    this.description = product?.description;
    this.price = new Prisma.Decimal(product?.price);
    this.imageUrl = product?.imageUrl;
    this.categoryId = product?.categoryId;
    this.isActive = product?.isActive ?? true;
    this.createdAt = product?.createdAt ?? new Date();
    this.updatedAt = new Date();
  }
}
