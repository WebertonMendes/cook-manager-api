import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(identifier: string) {
    super(`User '${identifier}' not found.`, HttpStatus.NOT_FOUND);
  }
}
