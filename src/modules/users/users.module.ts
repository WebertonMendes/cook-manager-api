import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { CryptographyModule } from '@/infra/helpers/cryptography/cryptography.module';
import { CreateUsersController } from './usecases/create-user/create-user.controller';
import { CreateUserUseCase } from './usecases/create-user/create-user.usecase';
import { DeleteUserController } from './usecases/delete-user/delete-user.controller';
import { DeleteUserUseCase } from './usecases/delete-user/delete-user.usecase';
import { FindAllUsersController } from './usecases/find-all-users/find-all-users.controller';
import { FindAllUsersUseCase } from './usecases/find-all-users/find-all-users.usecase';
import { FindUserByIdController } from './usecases/find-user-by-id/find-user-by-id.controller';
import { FindUserByIdUseCase } from './usecases/find-user-by-id/find-user-by-id.usecase';
import { UpdateUserController } from './usecases/update-user/update-user.controller';
import { UpdateUserUseCase } from './usecases/update-user/update-user.usecase';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUsersController,
    FindUserByIdController,
    FindAllUsersController,
    UpdateUserController,
    DeleteUserController,
  ],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
