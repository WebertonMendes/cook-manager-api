import { Controller, Get, Query } from '@nestjs/common';

import { FindAllUsersUseCase } from './find-all-users.usecase';
import { ListUsersOptionsDto } from '../../dto/list-users-options.dto';

@Controller('users')
export class FindAllUsersController {
  constructor(private readonly findAllUsers: FindAllUsersUseCase) {}

  @Get()
  async handle(@Query() options: ListUsersOptionsDto) {
    return await this.findAllUsers.execute(options);
  }
}
