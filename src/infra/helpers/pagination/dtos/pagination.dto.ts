// import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PaginationMetaDTO } from './pagination-meta.dto';

export class PaginationDTO<T> {
  @IsArray()
  // @ApiProperty({ isArray: true })
  readonly data: T[];

  // @ApiProperty({ type: () => PaginationMetaDTO })
  readonly meta: PaginationMetaDTO;

  constructor(data: T[], meta: PaginationMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}
