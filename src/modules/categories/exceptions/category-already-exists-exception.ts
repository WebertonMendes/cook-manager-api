import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryAlreadyExistsException extends HttpException {
  constructor(identifier: string) {
    super(`Category '${identifier}' already exists.`, HttpStatus.CONFLICT);
  }
}
