import { Injectable } from '@nestjs/common';

import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private repository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) throw new UserNotFoundException(id);

    await this.repository.delete(id);
  }
}
