import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderItemsDto {
  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
