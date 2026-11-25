import { randomUUID } from "node:crypto";
import { prisma } from "../src/db/prisma";
import { FAKE_MEMOS, FAKE_USERS } from "../src/fake-database";
import { hashPassword } from "../src/lib/password";

async function seed() {
  const authorIds = new Map<number, string>();

  for (const fixture of FAKE_USERS) {
    const existing = await prisma.betterAuthUser.findUnique({
      where: { email: fixture.email },
      select: { id: true },
    });
    if (existing) {
      authorIds.set(fixture.id, existing.id);
      continue;
    }

    const id = randomUUID();
    const author = await prisma.betterAuthUser.upsert({
      where: { email: fixture.email },
      create: {
        id,
        email: fixture.email,
        name: fixture.username,
        createdAt: new Date(`${fixture.createdAt}+09:00`),
        accounts: {
          create: {
            id: randomUUID(),
            accountId: id,
            providerId: "credential",
            password: await hashPassword(fixture.password),
          },
        },
      },
      update: {},
      select: { id: true },
    });
    authorIds.set(fixture.id, author.id);
  }

  if (process.argv.includes("--users-only")) {
    return;
  }

  const memos = FAKE_MEMOS.map((memo) => {
    const userId = authorIds.get(memo.userId);
    if (!userId) {
      throw new Error("실습 메모 작성자를 찾을 수 없습니다.");
    }
    return { ...memo, userId, createdAt: new Date(`${memo.createdAt}+09:00`) };
  });

  await prisma.memo.createMany({ data: memos, skipDuplicates: true });
}

seed()
  .catch((error: unknown) => {
    console.error(
      "실습 데이터 입력에 실패했습니다.",
      error instanceof Error ? error.name : "UnknownError",
    );
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
