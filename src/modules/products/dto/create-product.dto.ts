import {
  IsCurrency,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsCurrency()
  price: number;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsOptional()
  isActive?: boolean;
}
