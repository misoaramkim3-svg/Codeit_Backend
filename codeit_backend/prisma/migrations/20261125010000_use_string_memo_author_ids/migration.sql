BEGIN;

ALTER TABLE "BetterAuthUser" ADD COLUMN "legacyUserId" INTEGER;
CREATE UNIQUE INDEX "BetterAuthUser_legacyUserId_key" ON "BetterAuthUser"("legacyUserId");
ALTER TABLE "BetterAuthUser" ADD CONSTRAINT "BetterAuthUser_legacyUserId_fkey"
    FOREIGN KEY ("legacyUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 기존 JWT 사용자에게도 작성자 ID를 발급한다. 이메일 일치만으로 계정을 합치지 않는다.
WITH authors AS (
    SELECT gen_random_uuid()::text AS id, "id" AS legacy_id, "username", "createdAt"
    FROM "User"
)
INSERT INTO "BetterAuthUser" ("id", "name", "email", "createdAt", "updatedAt", "legacyUserId")
SELECT id, "username", id || '@memoit-legacy.invalid', "createdAt", CURRENT_TIMESTAMP, legacy_id
FROM authors;

ALTER TABLE "Memo" DROP CONSTRAINT "Memo_userId_fkey";
ALTER TABLE "Memo" ALTER COLUMN "userId" TYPE TEXT USING "userId"::text;
UPDATE "Memo" AS memo
SET "userId" = author."id"
FROM "BetterAuthUser" AS author
WHERE memo."userId" = author."legacyUserId"::text;
ALTER TABLE "Memo" ADD CONSTRAINT "Memo_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "BetterAuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

COMMIT;
