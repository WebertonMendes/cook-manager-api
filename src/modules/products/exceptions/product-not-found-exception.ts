import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(identifier: string) {
    super(`Product '${identifier}' not found.`, HttpStatus.NOT_FOUND);
  }
}
