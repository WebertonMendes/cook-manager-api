import { HashComparer } from '@/modules/users/helpers/hash-comparer';
import { HashGenerator } from '@/modules/users/helpers/hash-generator';

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(text: string): Promise<string> {
    return text.concat('-hashed');
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return text.concat('-hashed') === hash;
  }
}
