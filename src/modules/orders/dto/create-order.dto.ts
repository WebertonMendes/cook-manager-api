import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  table: number;

  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
