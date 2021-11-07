-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "status" TEXT NOT NULL DEFAULT E'TO_DO',

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
