import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteUserUseCase } from './delete-user.usecase';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUser: DeleteUserUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    return await this.deleteUser.execute(id);
  }
}
