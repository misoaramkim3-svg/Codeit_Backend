BEGIN;

-- 이메일 충돌은 서로 다른 계정을 자동으로 합치지 않고 작업을 중단한다.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM "User" AS legacy
        LEFT JOIN "BetterAuthUser" AS author ON author."legacyUserId" = legacy."id"
        WHERE author."id" IS NULL
           OR EXISTS (
                SELECT 1 FROM "BetterAuthUser" AS other
                WHERE other."email" = legacy."email" AND other."id" <> author."id"
           )
    ) THEN
        RAISE EXCEPTION 'Cannot migrate legacy accounts without an author mapping or with duplicate email';
    END IF;
END $$;

UPDATE "BetterAuthUser" AS author
SET "email" = legacy."email", "updatedAt" = CURRENT_TIMESTAMP
FROM "User" AS legacy
WHERE author."legacyUserId" = legacy."id" AND legacy."email" IS NOT NULL;

INSERT INTO "BetterAuthAccount" ("id", "accountId", "providerId", "userId", "password", "updatedAt")
SELECT gen_random_uuid()::text, author."id", 'credential', author."id", legacy."passwordHash", CURRENT_TIMESTAMP
FROM "User" AS legacy
JOIN "BetterAuthUser" AS author ON author."legacyUserId" = legacy."id"
WHERE legacy."email" IS NOT NULL AND legacy."passwordHash" IS NOT NULL;

ALTER TABLE "BetterAuthUser" DROP COLUMN "legacyUserId";
DROP TABLE "AuthSession";
DROP TABLE "User";

COMMIT;
