import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { ListProductsResponseDto } from '../dto/list-products-response.dto';
import { ProductResponseDto } from '../dto/product-response.dto';
import { ProductsFilterOptionsDto } from '../dto/products-filter-options.dto';

export abstract class ProductsRepository {
  abstract findAll(
    filters: ProductsFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListProductsResponseDto>;
  abstract findById(id: string): Promise<ProductResponseDto | null>;
  abstract create(data: CreateProductDto): Promise<void>;
}
