import { prisma } from "../src/db/prisma";
import { FAKE_MEMOS, FAKE_USERS } from "../src/fake-database";

async function seed() {
  const users = FAKE_USERS.map(({ id, username }) => ({ id, username }));
  // 시간대가 없는 실습 메모의 작성 시각을 한국 시각으로 해석한다.
  const memos = FAKE_MEMOS.map((memo) => ({
    ...memo,
    createdAt: new Date(`${memo.createdAt}+09:00`),
  }));

  // 사용자를 먼저 넣어야 메모가 작성자를 참조할 수 있다.
  await prisma.$transaction([
    prisma.user.createMany({ data: users, skipDuplicates: true }),
    prisma.memo.createMany({ data: memos, skipDuplicates: true }),
  ]);
}

seed()
  .catch((error: unknown) => {
    console.error("실습 데이터 입력에 실패했습니다.", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
