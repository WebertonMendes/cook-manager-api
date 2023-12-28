import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException {
  constructor(identifier: string) {
    super(`Category '${identifier}' not found.`, HttpStatus.NOT_FOUND);
  }
}
