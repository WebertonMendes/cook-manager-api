import { Module } from '@nestjs/common';

import { BcryptHasher } from './bcrypt-hasher';
import { HashComparer } from '@/modules/users/helpers/hash-comparer';
import { HashGenerator } from '@/modules/users/helpers/hash-generator';

@Module({
  providers: [
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [HashComparer, HashGenerator],
})
export class CryptographyModule {}
