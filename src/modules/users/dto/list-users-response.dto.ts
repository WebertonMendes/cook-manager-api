import { PaginationMetaDTO } from '@/infra/helpers/pagination/dtos/pagination-meta.dto';
import { UserResponseDto } from './user-response.dto';

export class ListUsersResponseDto {
  data: UserResponseDto[];
  pagination: PaginationMetaDTO;
}
