import { Injectable } from '@nestjs/common';

import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
import { UsersRepository } from '../../repositories/users.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private repository: UsersRepository) {}

  async execute(id: string, data: UpdateUserDto): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) throw new UserNotFoundException(id);

    await this.repository.update(id, data);
  }
}
