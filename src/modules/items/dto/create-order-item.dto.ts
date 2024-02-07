export class CreateOrderItemDto {
  orderId: string;
  productId: string;
  observation: string | null;
  quantity: number;
  userId: string;
}
