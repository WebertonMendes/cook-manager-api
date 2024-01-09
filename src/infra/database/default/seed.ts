import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    where: { name: 'Inactive Products' },
    update: {},
    create: {
      id: '50228d88-a780-4982-b844-c95c405cc290',
      name: 'Inactive Products',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
