import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CryptographyModule } from '@/infra/helpers/cryptography/cryptography.module';
import { CreateUsersController } from './usecases/create-user/create-user.controller';
import { CreateUserUseCase } from './usecases/create-user/create-user.usecase';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUsersController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
