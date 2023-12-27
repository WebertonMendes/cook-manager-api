import { Category } from '@prisma/client';
import { randomUUID } from 'crypto';

export class CategoryEntity implements Category {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(category?: Partial<CategoryEntity>) {
    this.id = category.id ? category.id : randomUUID();
    this.name = category?.name;
    this.isActive = category?.isActive ?? true;
    this.createdAt = category?.createdAt ?? new Date();
    this.updatedAt = new Date();
  }
}
