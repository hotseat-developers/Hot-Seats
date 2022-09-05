/*
  Warnings:

  - Added the required column `task_number` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "task_number" INTEGER NOT NULL;
