import { Body, Controller, Get } from '@nestjs/common';

import { FindAllUsersUseCase } from './find-all-users.usecase';
import { UsersFilterOptionsDto } from '../../dto/users-filter-options.dto';

@Controller('users')
export class FindAllUsersController {
  constructor(private readonly findAllUsersUseCase: FindAllUsersUseCase) {}

  @Get()
  create(@Body() filters: UsersFilterOptionsDto) {
    return this.findAllUsersUseCase.execute(filters);
  }
}
