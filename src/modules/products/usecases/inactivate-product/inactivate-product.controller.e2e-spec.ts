import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ProductFactory } from 'test/factories/make-products';

describe('Delete product by ID (E2E)', () => {
  let app: INestApplication;
  let productFactory: ProductFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ProductFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    productFactory = moduleRef.get(ProductFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[DELETE] /products/:id', async () => {
    await request(app.getHttpServer()).post('/categories').send({
      id: '50228d88-a780-4982-b844-c95c405cc290',
      name: 'Inactive Products',
    });

    const category = await prisma.category.findUnique({
      where: {
        name: 'Inactive Products',
      },
    });

    const product = await productFactory.makePrismaProduct();

    const response = await request(app.getHttpServer())
      .delete(`/products/${product.id}`)
      .send();

    const productOnDatabase = await prisma.product.findUnique({
      where: {
        id: product.id,
      },
    });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(productOnDatabase).toBeTruthy();
    expect(productOnDatabase.categoryId).toEqual(category.id);
    expect(productOnDatabase.imageUrl).toBeNull();
    expect(productOnDatabase.isActive).toEqual(false);
  });

  test('[DELETE] /products/:id throw not found', async () => {
    const productId = 'fake-productId';

    const response = await request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .send();

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Product '${productId}' not found.`);
  });
});
