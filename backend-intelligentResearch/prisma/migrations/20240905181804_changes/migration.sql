/*
  Warnings:

  - You are about to drop the column `researchId` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `employerId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_researchId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "researchId";
ALTER TABLE "Employee" ADD COLUMN     "employerId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
