import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductInactiveException extends HttpException {
  constructor(identifier: string) {
    super(
      `Product '${identifier}' cannot be used as it is inactive.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
