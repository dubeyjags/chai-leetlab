/*
  Warnings:

  - You are about to drop the column `editorials` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "editorials",
ADD COLUMN     "editorial" TEXT;
