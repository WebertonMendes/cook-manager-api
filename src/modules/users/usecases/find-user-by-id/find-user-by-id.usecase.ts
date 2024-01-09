import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../../repositories/users.repository';
import { UserResponseDto } from '../../dto/user-response.dto';
import { UserNotFoundException } from '../../exceptions/user-not-found-exception';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private repository: UsersRepository) {}

  async execute(id: string): Promise<UserResponseDto> {
    const user = await this.repository.findById(id);

    if (!user) throw new UserNotFoundException(id);

    return user;
  }
}
