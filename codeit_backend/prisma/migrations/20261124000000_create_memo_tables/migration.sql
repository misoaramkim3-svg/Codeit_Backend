BEGIN;

CREATE TABLE "User" (
  "id" INTEGER NOT NULL,
  "username" TEXT NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Memo" (
  "id" SERIAL NOT NULL,
  "userId" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Memo_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Memo_userId_idx" ON "Memo"("userId");

ALTER TABLE "Memo"
  ADD CONSTRAINT "Memo_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- IDs 1 through 100 are reserved for the existing practice memos.
ALTER SEQUENCE "Memo_id_seq" RESTART WITH 101;

COMMIT;
