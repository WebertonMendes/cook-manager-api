import { Injectable } from '@nestjs/common';

import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFoundException(id);

    await this.userRepository.deleteById(id);
  }
}
