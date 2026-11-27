"use client";

import MemoFormComponent from "@/components/custom/memo/memo-form-component";
import { useCreateMemoMutation } from "@/hooks/use-create-memo-mutation";
import { useMeQuery } from "@/hooks/use-me-query";
import { useRouter } from "next/navigation";

const NewMemoPage = () => {
  const { mutate, isPending, isError } = useCreateMemoMutation();
  const router = useRouter();
  const { data: me, isLoading } = useMeQuery();

  const createMemo = (title: string, content: string, imageUrl: string) => {
    mutate(
      { title, content, imageUrl },
      {
        onSuccess: () => {
          router.push("/memos");
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
