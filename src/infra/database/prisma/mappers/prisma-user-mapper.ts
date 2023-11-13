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
}
