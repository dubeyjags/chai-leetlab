/*
  Warnings:

  - You are about to drop the column `refrenseSolution` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `testcase` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `referenceSolutions` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testcases` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "refrenseSolution",
DROP COLUMN "testcase",
ADD COLUMN     "hints" TEXT,
ADD COLUMN     "referenceSolutions" JSONB NOT NULL,
ADD COLUMN     "testcases" JSONB NOT NULL;
