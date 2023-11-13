import { $Enums, User } from '@prisma/client';
import { randomUUID } from 'crypto';
// import { randomUUID } from 'crypto';

export class UserEntity implements User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  password: string;
  role: $Enums.UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user?: Partial<UserEntity>) {
    this.id = user.id ? user.id : randomUUID();
    this.name = user?.name;
    this.username = user?.username;
    this.avatarUrl = user?.avatarUrl ?? null;
    this.password = user?.password;
    this.role = user?.role ?? $Enums.UserRole.SERVICE;
    this.isActive = user?.isActive ?? true;
    this.createdAt = user?.createdAt ?? new Date();
    this.updatedAt = new Date();
  }
}
