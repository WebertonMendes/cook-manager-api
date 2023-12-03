import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { ListUsersResponseDto } from '@/modules/users/dto/list-users-response.dto';
import { UserResponseDto } from '@/modules/users/dto/user-response.dto';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDto(raw: PrismaUser): UserResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      username: raw.username,
      avatarUrl: raw.avatarUrl ? raw.avatarUrl : null,
      role: raw.role,
      isActive: raw.isActive,
    };
  }

  static toDtoPaginated(
    data: UserResponseDto[],
    pagination: PaginationMetaDTO,
  ): ListUsersResponseDto {
    return {
      data,
      pagination,
    };
  }
}
