import { PaginationParams } from '@/infra/helpers/pagination/pagination-params';
import { $Enums } from '@prisma/client';

export class UsersFilterOptionsDto {
  username?: string;
  role?: $Enums.UserRole;
  isActive?: boolean;
  pagination?: PaginationParams;
}
