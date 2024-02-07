import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderInProgressException extends HttpException {
  constructor(identifier: string) {
    super(
      `Order '${identifier}' cannot be removed as it has already in progress.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
