import { $Enums } from '@prisma/client';

export class UsersFilterOptionsDto {
  name?: string;
  username?: string;
  role?: $Enums.UserRole;
  isActive?: boolean;
}
