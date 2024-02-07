import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotFoundException extends HttpException {
  constructor(identifier: string) {
    super(`Order '${identifier}' not found.`, HttpStatus.NOT_FOUND);
  }
}
