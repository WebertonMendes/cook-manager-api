import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductCannotDeletedException extends HttpException {
  constructor(identifier: string) {
    super(
      `Product '${identifier}' cannot be deleted as it has links or dependencies.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
