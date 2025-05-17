/*
  Warnings:

  - You are about to drop the column `stnin` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "stnin",
ADD COLUMN     "stdin" TEXT;
