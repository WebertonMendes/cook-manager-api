import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../../dto/create-user.dto';
import { CreateUserUseCase } from './create-user.usecase';

@Controller('users')
export class CreateUsersController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  async handle(@Body() user: CreateUserDto) {
    await this.createUser.execute(user);
  }
}
