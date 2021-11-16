-- RenameTable
ALTER TABLE "Todo" RENAME TO "Task";
ALTER SEQUENCE "Todo_id_seq" RENAME TO "Task_id_seq";
ALTER TABLE "Task" RENAME CONSTRAINT "Todo_pkey" TO "Task_pkey";
