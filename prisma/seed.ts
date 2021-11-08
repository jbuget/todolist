import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.upsert({
    where: { id: 1 },
    update: {
      status: 'DONE'
    },
    create: {
      id: 1,
      content: 'Todo 1 content'
    }
  });
  await prisma.todo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      content: 'Todo 2 content'
    }
  });
  await prisma.todo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      content: 'Todo 3 content'
    }
  });

  await prisma.$queryRaw`SELECT setval('"Todo_id_seq"', 3);`;

  await prisma.todo.create({
    data: {
      content: 'Todo 4 content'
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
