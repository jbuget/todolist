import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.create({
    data: {
      id: 1,
      content: 'Todo 1 content'
    }
  });
  await prisma.todo.create({
    data: {
      id: 2,
      content: 'Todo 2 content'
    }
  });
  await prisma.todo.create({
    data: {
      id: 3,
      content: 'Todo 3 content'
    }
  });

  await prisma.$queryRaw`SELECT setval('"Todo_id_seq"', 3);`;

  await prisma.todo.create({
    data: {
      content: 'Todo 3 content'
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
