import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderItemNotFoundException extends HttpException {
  constructor(identifier: string) {
    super(`Order item '${identifier}' not found.`, HttpStatus.NOT_FOUND);
  }
}
