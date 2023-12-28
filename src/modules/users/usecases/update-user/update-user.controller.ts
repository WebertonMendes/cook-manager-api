import { Controller, Patch, Param, Body } from '@nestjs/common';

import { UpdateUserDto } from '../../dto/update-user.dto';
import { UpdateUserUseCase } from './update-user.usecase';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUserUseCase) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() data: UpdateUserDto) {
    await this.updateUser.execute(id, data);
  }
}
