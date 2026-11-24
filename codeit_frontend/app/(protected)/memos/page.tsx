"use client";

import MemoFeatureComponent from "@/components/custom/memo/memo-feature-component";
import MemoListComponent from "@/components/custom/memo/memo-list-component";
import MemoListSkeletonComponent from "@/components/custom/memo/memo-list-skeleton-component";
import { useMemosQuery } from "@/hooks/use-memos-query";
import { useMeQuery } from "@/hooks/use-me-query";
import { penOf } from "@/lib/pen";
import { useAuthStore } from "@/store/auth-store";
import { formatToday } from "@/lib/date";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const MemosPage = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMemosQuery();

  const token = useAuthStore((state) => state.token);
  const { data: me } = useMeQuery(token);

  const memos = data?.pages.flatMap((page) => page.memos) ?? [];

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (sentinel === null || hasNextPage !== true || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting === true) {
          fetchNextPage();
        }
      },
      { rootMargin: "0px 0px 200px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className="page flex-1">
      <header className="diary-header">
        <div>
          <p className="diary-date">{formatToday()}</p>
          <h1 className="diary-title">
            {me && (
              <span className="diary-title-strong">
                <span className={penOf(me.id).text}>{me.username}</span>님,
              </span>
            )}
            <span className="diary-title-soft">오늘은 어떤 하루였나요?</span>
          </h1>
          <p className="diary-desc">
            여럿이 한 권에 돌려 쓰는 교환일기예요. 최근에 쓴 메모부터 보여요.
          </p>
        </div>
        <Link
          href="/memos/new"
          className="btn-primary shrink-0 self-start sm:self-auto"
        >
          <PenLine className="size-4" aria-hidden />
          오늘의 메모 쓰기
        </Link>
      </header>

      {isLoading === true ? (
        <MemoListSkeletonComponent></MemoListSkeletonComponent>
      ) : isError === true ? (
        <div className="status" role="alert">
          <p className="status-title">메모를 불러오지 못했어요</p>
          <p className="status-desc">잠시 후 페이지를 새로 고침해 주세요.</p>
        </div>
      ) : (
        <>
          <MemoFeatureComponent memos={memos.slice(0, 5)} />
          <MemoListComponent memos={memos}></MemoListComponent>
          {hasNextPage === true && (
            <div
              ref={sentinelRef}
              className="mt-12 flex justify-center text-sm text-ink-muted"
            >
              {isFetchingNextPage && "불러오는 중..."}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default MemosPage;
