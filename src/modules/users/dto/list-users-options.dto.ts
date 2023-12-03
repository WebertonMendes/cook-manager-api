import { PaginationOptionsDTO } from '@/infra/helpers/pagination/dtos/pagination-options.dto';
import { $Enums } from '@prisma/client';

export class ListUsersOptionsDto extends PaginationOptionsDTO {
  name?: string;
  username?: string;
  role?: $Enums.UserRole;
  isActive?: boolean;
}
