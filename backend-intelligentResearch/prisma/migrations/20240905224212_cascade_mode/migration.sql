-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_employerId_fkey";

-- DropForeignKey
ALTER TABLE "Research" DROP CONSTRAINT "Research_creatorId_fkey";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Research" ADD CONSTRAINT "Research_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
