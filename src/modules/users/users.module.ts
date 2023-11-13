import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CryptographyModule } from '@/infra/helpers/cryptography/cryptography.module';
import { CreateUsersController } from './usecases/create-user/create-user.controller';
import { CreateUserUseCase } from './usecases/create-user/create-user.usecase';
import { FindUserByIdController } from './usecases/find-user-by-id/find-user-by-id.controller';
import { FindUserByIdUseCase } from './usecases/find-user-by-id/find-user-by-id.usecase';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUsersController, FindUserByIdController],
  providers: [CreateUserUseCase, FindUserByIdUseCase],
})
export class UsersModule {}
