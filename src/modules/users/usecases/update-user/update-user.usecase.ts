import { Injectable } from '@nestjs/common';

import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
import { UsersRepository } from '../../repositories/users.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, data: UpdateUserDto): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new UserNotFoundException(id);

    await this.usersRepository.update(id, data);
  }
}
