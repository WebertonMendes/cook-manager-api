import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderItemInProgressException extends HttpException {
  constructor(identifier: string) {
    super(
      `Order item '${identifier}' cannot be removed as it has already in progress.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
