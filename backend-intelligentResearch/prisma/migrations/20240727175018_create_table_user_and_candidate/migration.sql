-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "candidate" TEXT NOT NULL,
    "geo_loc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "candidate" (
    "name" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_name_key" ON "candidate"("name");
