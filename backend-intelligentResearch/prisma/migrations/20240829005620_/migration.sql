/*
  Warnings:

  - You are about to drop the column `lat` on the `Voter` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `Voter` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `Voter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "lat" STRING;
ALTER TABLE "Vote" ADD COLUMN     "long" STRING;
ALTER TABLE "Vote" ADD COLUMN     "neighborhood" STRING;

-- AlterTable
ALTER TABLE "Voter" DROP COLUMN "lat";
ALTER TABLE "Voter" DROP COLUMN "long";
ALTER TABLE "Voter" DROP COLUMN "neighborhood";
