import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );

  await app.listen(process.env.APP_PORT || 3000);
  console.log(
    `API is Running on PORT ${
      process.env.APP_PORT ? process.env.APP_PORT : 3000
    }. 🚀`,
  );
}
bootstrap();
