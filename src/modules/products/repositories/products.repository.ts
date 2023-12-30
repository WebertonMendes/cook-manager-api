import { CreateProductDto } from '../dto/create-product.dto';

export abstract class ProductsRepository {
  abstract create(data: CreateProductDto): Promise<void>;
}
