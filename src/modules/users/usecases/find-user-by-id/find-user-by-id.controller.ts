import { Controller, Get, Param } from '@nestjs/common';

import { FindUserByIdUseCase } from './find-user-by-id.usecase';

@Controller('users')
export class FindUserByIdController {
  constructor(private readonly findUserById: FindUserByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    return await this.findUserById.execute(id);
  }
}
