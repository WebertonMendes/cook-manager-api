import { $Enums } from '@prisma/client';

export class UserResponseDto {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  role?: $Enums.UserRole;
  isActive?: boolean;
}
