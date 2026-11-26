import { randomUUID } from "node:crypto";
import { prisma } from "../src/db/prisma";
import { FAKE_MEMOS, FAKE_USERS } from "../src/fake-database";
import { hashPassword } from "../src/lib/password";

const EXAMPLE_MEMO_ID = 100;
const EXAMPLE_COMMENTS = [
  {
    id: "seed-comment-1",
    authorFixtureId: 2,
    content: "다섯 개 중 세 개나 해냈다니 멋져요!",
  },
  {
    id: "seed-comment-2",
    authorFixtureId: 3,
    content: "저도 연초에 적어 둔 목표를 다시 펼쳐 봐야겠어요.",
  },
  {
    id: "seed-comment-3",
    authorFixtureId: 4,
    content: "주급날마다 조금씩 모으는 것도 좋더라고요.",
  },
];

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

  if (!process.argv.includes("--comments-only")) {
    const memos = FAKE_MEMOS.map((memo) => {
      const userId = authorIds.get(memo.userId);
      if (!userId) {
        throw new Error("실습 메모 작성자를 찾을 수 없습니다.");
      }
      return {
        ...memo,
        userId,
        createdAt: new Date(`${memo.createdAt}+09:00`),
      };
    });

    await prisma.memo.createMany({ data: memos, skipDuplicates: true });
  }

  const exampleMemo = await prisma.memo.findUnique({
    where: { id: EXAMPLE_MEMO_ID },
    select: { id: true },
  });
  if (!exampleMemo) {
    console.log(`예시 댓글을 추가할 메모(${EXAMPLE_MEMO_ID}번)가 없습니다.`);
    return;
  }

  const comments = EXAMPLE_COMMENTS.map(({ id, authorFixtureId, content }) => {
    const userId = authorIds.get(authorFixtureId);
    if (!userId) {
      throw new Error("실습 댓글 작성자를 찾을 수 없습니다.");
    }
    return { id, memoId: exampleMemo.id, userId, content };
  });

  const { count } = await prisma.comment.createMany({
    data: comments,
    skipDuplicates: true,
  });
  console.log(
    `메모 ${exampleMemo.id}번에 예시 댓글 ${count}개를 추가했습니다.`,
  );
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
