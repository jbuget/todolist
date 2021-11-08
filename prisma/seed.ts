import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      content: 'Todo 1 content',
      status: 'DONE'
    }
  });
  await prisma.todo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      content: 'Todo 2 content'
    }
  });
  await prisma.todo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      content: 'Todo 3 content'
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
