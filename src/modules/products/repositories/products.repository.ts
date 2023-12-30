import { CreateProductDto } from '../dto/create-product.dto';
import { ProductResponseDto } from '../dto/product-response.dto';

export abstract class ProductsRepository {
  abstract findById(id: string): Promise<ProductResponseDto | null>;
  abstract create(data: CreateProductDto): Promise<void>;
}
