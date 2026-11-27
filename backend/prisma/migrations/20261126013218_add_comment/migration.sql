-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "memoId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_memoId_idx" ON "Comment"("memoId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_memoId_fkey" FOREIGN KEY ("memoId") REFERENCES "Memo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
