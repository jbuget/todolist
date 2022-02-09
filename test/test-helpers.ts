import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

function getPrismaClient() {
  if (prismaClient) {
    return prismaClient;
  }
  return new PrismaClient();
}

function getRandomInt(max: number = 10_000): number {
  return Math.floor(Math.random() * max);
}

async function resetDatabase() {
  const prisma = getPrismaClient();
  return prisma.task.deleteMany({});
}

export {
  getPrismaClient,
  getRandomInt,
  resetDatabase
};
