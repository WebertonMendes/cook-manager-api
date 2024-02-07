import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderIsFinishedException extends HttpException {
  constructor(identifier: string) {
    super(
      `Order '${identifier}' cannot be removed as it has already been finished.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
