/*
  Warnings:

  - You are about to drop the column `code` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `compile_output` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `sourceCode` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "code",
DROP COLUMN "compile_output",
ADD COLUMN     "compileOutput" TEXT,
ADD COLUMN     "sourceCode" JSONB NOT NULL;
