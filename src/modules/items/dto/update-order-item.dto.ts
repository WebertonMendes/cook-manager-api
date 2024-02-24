import { $Enums } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateOrderItemDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsEnum($Enums.OrderItemStatus)
  status?: $Enums.OrderItemStatus;
}
