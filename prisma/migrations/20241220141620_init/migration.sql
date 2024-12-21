-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "goal" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AngerRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "situation" TEXT,
    "feeling" TEXT,
    "occurredDate" TIMESTAMPTZ NOT NULL,
    "workTypeId" INTEGER NOT NULL,

    CONSTRAINT "AngerRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkContent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "WorkContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "AngerRecord_userId_occurredDate_idx" ON "AngerRecord"("userId", "occurredDate");

-- CreateIndex
CREATE INDEX "WorkContent_userId_idx" ON "WorkContent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkContent_userId_content_category_key" ON "WorkContent"("userId", "content", "category");

-- AddForeignKey
ALTER TABLE "AngerRecord" ADD CONSTRAINT "AngerRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AngerRecord" ADD CONSTRAINT "AngerRecord_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkContent" ADD CONSTRAINT "WorkContent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
