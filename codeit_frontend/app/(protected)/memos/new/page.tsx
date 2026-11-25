"use client";

import MemoFormComponent from "@/components/custom/memo/memo-form-component";
import { useCreateMemoMutation } from "@/hooks/use-create-memo-mutation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NewMemoPage = () => {
  const { mutate, isPending, isError } = useCreateMemoMutation();
  const router = useRouter();
  const { data: session, isPending: isLoading } = authClient.useSession();
  const me = session?.user;

  const createMemo = (title: string, content: string, imageUrl: string) => {
    if (!me) {
      return;
    }

    mutate(
      { title, content, userId: me.id, imageUrl },
      {
        onSuccess: (memo) => {
          router.push(`/memos/${memo.id}`);
        },
      },
    );
  };

  return (
    <main className="page-narrow">
      <h1 className="sr-only">메모 작성</h1>
      {isLoading ? (
        <p className="text-ink-muted">내 정보를 불러오는 중...</p>
      ) : !me ? (
        <p className="text-ink-muted">내 정보를 불러오지 못했어요.</p>
      ) : (
        <MemoFormComponent
          createMemo={createMemo}
          isPending={isPending}
          isError={isError}
        ></MemoFormComponent>
      )}
    </main>
  );
};

export default NewMemoPage;
