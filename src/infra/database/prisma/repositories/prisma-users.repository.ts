import { Injectable } from '@nestjs/common';

import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { ListUsersResponseDto } from '@/modules/users/dto/list-users-response.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { UserResponseDto } from '@/modules/users/dto/user-response.dto';
import { UsersFilterOptionsDto } from '@/modules/users/dto/users-filter-options.dto';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { IntegrationFailureException } from '../exceptions/integration-failure.exception';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters: UsersFilterOptionsDto,
    pagination: PaginationOptionsDTO,
  ): Promise<ListUsersResponseDto> {
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: filters.name,
          mode: 'insensitive',
        },
        username: {
          contains: filters.username,
          mode: 'insensitive',
        },
        role: filters.role,
        isActive: filters.isActive,
      },
      take: pagination.take,
      skip: pagination.skip,
    });

    const totalUsers = await this.prisma.user.count();

    const paginationMeta = new PaginationMetaDTO({
      pageOptionsDTO: pagination,
      itemCount: totalUsers,
    });

    const usersResponse = users.map((user) => PrismaUserMapper.toDto(user));

    return PrismaUserMapper.toDtoPaginated(usersResponse, paginationMeta);
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
    try {
      await this.prisma.user.create({ data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<void> {
    try {
      await this.prisma.user.update({ where: { id }, data });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new IntegrationFailureException(error);
    }
  }
}
