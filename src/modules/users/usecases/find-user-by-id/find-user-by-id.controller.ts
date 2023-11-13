import { Controller, Get, Param } from '@nestjs/common';

import { FindUserByIdUseCase } from './find-user-by-id.usecase';

@Controller('users')
export class FindUserByIdController {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    return await this.findUserByIdUseCase.execute(id);
  }
}
