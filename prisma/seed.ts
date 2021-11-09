import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      content: 'Todo 1 content',
      status: 'DONE',
      createdAt: new Date('2021-11-09T17:08:02.865Z'),
      updatedAt: new Date('2021-11-09T17:08:02.866Z')
    }
  });
  await prisma.todo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      content: 'Todo 2 content',
      createdAt: new Date('2021-11-09T17:08:02.927Z'),
      updatedAt: new Date('2021-11-09T17:08:02.928Z')
    }
  });
  await prisma.todo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      content: 'Todo 3 content',
      createdAt: new Date('2021-11-09T17:08:02.969Z'),
      updatedAt: new Date('2021-11-09T17:08:02.970Z')
    }
  });

  await prisma.$queryRaw`SELECT setval('"Todo_id_seq"', (SELECT MAX(id) FROM "Todo"));`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
