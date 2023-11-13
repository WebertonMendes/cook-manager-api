import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UserResponseDto } from '@/modules/users/dto/user-response.dto';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UsersFilterOptionsDto } from '@/modules/users/dto/users-filter-options.dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: UsersFilterOptionsDto): Promise<UserResponseDto[]> {
    console.log(filters);

    const listUsers = await this.prisma.user.findMany();

    return listUsers.map((user) => PrismaUserMapper.toDto(user));
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return PrismaUserMapper.toDto(user);
  }

  async findByUsername(username: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) return null;

    return PrismaUserMapper.toDto(user);
  }

  async createUser(data: CreateUserDto): Promise<void> {
    await this.prisma.user.create({ data });
  }
}
