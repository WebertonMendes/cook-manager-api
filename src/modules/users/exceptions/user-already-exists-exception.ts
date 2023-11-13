import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(identifier: string) {
    super(`User '${identifier}' already exists.`, HttpStatus.CONFLICT);
  }
}
