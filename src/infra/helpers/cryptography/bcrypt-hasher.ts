import { compare, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HashComparer } from '@/modules/users/helpers/hash-comparer';
import { HashGenerator } from '@/modules/users/helpers/hash-generator';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  hash(text: string): Promise<string> {
    return hash(text, this.HASH_SALT_LENGTH);
  }

  compare(text: string, hash: string): Promise<boolean> {
    return compare(text, hash);
  }
}
