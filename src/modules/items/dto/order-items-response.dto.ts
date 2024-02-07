export class OrderItemsResponseDto {
  orderId: string;
  productId: string;
  quantity: number;
  observation: string | null;
  userId: string;
  updatedAt: string;
}
