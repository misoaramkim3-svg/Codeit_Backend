"use client";

import FormMessageComponent from "@/components/custom/form/form-message-component";
import { Button } from "@/components/ui/button";
import { useDeleteMemoMutation } from "@/hooks/use-delete-memo-mutation";
import { useMemoQuery } from "@/hooks/use-memo-query";
import MemoImage from "./memo-image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { formatLongDate, parseDiaryDate } from "@/lib/date";
import { useEffect } from "react";
import WriterComponent from "./writer-component";

const MemoDetailComponent = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: memo, isLoading, isError } = useMemoQuery(Number(params.id));
  const deleteMemo = useDeleteMemoMutation();

  useEffect(() => {
    if (memo) {
      document.title = memo.title;
    }
  }, [memo]);

  if (isLoading) {
    return (
      <div role="status" aria-busy="true">
        <span className="sr-only">메모를 불러오는 중이에요</span>
        <div className="skeleton h-5 w-24" />
        <div className="page-header mt-10">
          <div className="skeleton h-4 w-48" />
          <div className="skeleton mt-4 h-9 w-3/4" />
          <div className="skeleton mt-4 h-3 w-16" />
        </div>
        <div className="article-image">
          <div className="skeleton absolute inset-0" />
        </div>
        <div className="mt-12 flex flex-col gap-3">
          <div className="skeleton h-5 w-full" />
          <div className="skeleton h-5 w-full" />
          <div className="skeleton h-5 w-2/3" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="status" role="alert">
        <h1 className="status-title">메모를 불러오지 못했어요</h1>
        <p className="status-desc">잠시 후 페이지를 새로 고침해 주세요.</p>
        <Link href="/memos" className="btn-secondary mt-10">
          메모 목록으로
        </Link>
      </div>
    );
  }

  if (!memo) {
    return (
      <div className="status">
        <h1 className="status-title">메모를 찾을 수 없어요</h1>
        <p className="status-desc">메모 목록에서 메모를 다시 선택해 주세요.</p>
        <Link href="/memos" className="btn-secondary mt-10">
          메모 목록으로
        </Link>
      </div>
    );
  }

  const date = parseDiaryDate(memo.createdAt);

  const handleDelete = () => {
    if (!window.confirm("이 메모를 삭제할까요? 삭제하면 복구할 수 없어요.")) {
      return;
    }

    deleteMemo.mutate(memo.id, {
      onSuccess: () => router.replace("/memos"),
    });
  };

  return (
    <article>
      <Link href="/memos" className="back-link">
        ← 메모 목록
      </Link>

      <header className="page-header mt-10">
        <p className="diary-date">
          <time dateTime={memo.createdAt}>
            {formatLongDate(date)} · {date.time}
          </time>
        </p>
        <div className="mt-4 flex items-start justify-between gap-4">
          <h1 className="article-title min-w-0 wrap-break-word">
            {memo.title}
          </h1>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMemo.isPending}
          >
            {deleteMemo.isPending ? "삭제 중..." : "삭제"}
          </Button>
        </div>
        <p className="meta mt-4">
          <WriterComponent userId={memo.userId} username={memo.username} />의
          메모
        </p>
        {deleteMemo.isError && (
          <FormMessageComponent
            urgent
            className="mt-3"
            message="메모를 삭제하지 못했어요. 다시 시도해 주세요."
          />
        )}
      </header>

      <div className="article-image">
        <MemoImage
          src={memo.imageUrl}
          alt={memo.title}
          fill
          sizes="(min-width: 640px) 620px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="article-body">
        {memo.content
          .split("\n")
          .filter((paragraph) => paragraph.trim() !== "")
          .map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
      </div>
    </article>
  );
};

export default MemoDetailComponent;
