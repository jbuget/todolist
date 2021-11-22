import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

function getPrismaClient() {
  if (prismaClient) {
    return prismaClient;
  }
  return new PrismaClient();
}

async function resetDatabase() {
  const prisma = getPrismaClient();
  return prisma.task.deleteMany({});
}

export {
  getPrismaClient,
  resetDatabase
};
