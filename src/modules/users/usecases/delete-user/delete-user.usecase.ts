import { Injectable } from '@nestjs/common';

import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new UserNotFoundException(id);

    await this.usersRepository.deleteById(id);
  }
}
