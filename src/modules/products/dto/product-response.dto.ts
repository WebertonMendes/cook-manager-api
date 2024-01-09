import { Prisma } from '@prisma/client';

export class ProductResponseDto {
  id: string;
  name: string;
  description?: string;
  price: Prisma.Decimal;
  imageUrl?: string;
  categoryId: string;
  isActive?: boolean;
}
