export class ProductResponseDto {
  id: string;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
  categoryId: string;
  isActive?: boolean;
}
