import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateOrderException extends HttpException {
  constructor(identifier: string) {
    super(
      `It is not possible to create a duplicate order, the order '${identifier}' is open.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
