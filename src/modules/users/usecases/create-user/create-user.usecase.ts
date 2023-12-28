import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../../dto/create-user.dto';
import { UserAlreadyExistsException } from '../../exceptions/user-already-exists-exception';
import { HashGenerator } from '../../helpers/hash-generator';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(user: CreateUserDto): Promise<void> {
    const userWithSameUsername = await this.usersRepository.findByUsername(
      user.username,
    );

    if (userWithSameUsername) {
      throw new UserAlreadyExistsException(user.username);
    }

    const hashedPassword = await this.hashGenerator.hash(user.password);

    const userData: CreateUserDto = {
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
      password: hashedPassword,
    };

    await this.usersRepository.createUser(userData);
  }
}
