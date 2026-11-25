BEGIN;

ALTER TABLE "User" ADD COLUMN "localAccountId" BIGINT;
CREATE UNIQUE INDEX "User_localAccountId_key" ON "User"("localAccountId");

CREATE SEQUENCE "User_id_seq" AS INTEGER OWNED BY "User"."id";
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('"User_id_seq"');

-- Reserve the initial IDs for the seed users even when the table is empty.
SELECT setval('"User_id_seq"', GREATEST(COALESCE(MAX("id"), 0), 5) + 1, false)
FROM "User";

COMMIT;
