"use client";

import MemoFeatureComponent from "@/components/custom/memo/memo-feature-component";
import MemoListComponent from "@/components/custom/memo/memo-list-component";
import MemoListSkeletonComponent from "@/components/custom/memo/memo-list-skeleton-component";
import { Input } from "@/components/ui/input";
import { useMemosQuery } from "@/hooks/use-memos-query";
import { authClient } from "@/lib/auth-client";
import { penOf } from "@/lib/pen";
import { formatToday } from "@/lib/date";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

const MemosPage = () => {
  const [authorInput, setAuthorInput] = useState("");
  const [authorName, setAuthorName] = useState("");
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMemosQuery(authorName);

  const { data: session } = authClient.useSession();
  const me = session?.user;

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
  }, [authorName, hasNextPage, isFetchingNextPage, fetchNextPage]);

  function searchByAuthor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthorName(authorInput.trim());
  }

  function clearAuthorSearch() {
    setAuthorInput("");
    setAuthorName("");
  }

  return (
    <main className="page flex-1">
      <header className="diary-header">
        <div>
          <p className="diary-date">{formatToday()}</p>
          <h1 className="diary-title">
            {me && (
              <span className="diary-title-strong">
                <span className={penOf(me.id).text}>{me.name}</span>
                님,
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

      <form role="search" onSubmit={searchByAuthor} className="mb-8 max-w-lg">
        <label htmlFor="memo-author" className="mb-2 block text-sm font-medium">
          작성자 이름
        </label>
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <Input
            id="memo-author"
            type="text"
            value={authorInput}
            onChange={(event) => setAuthorInput(event.target.value)}
            className="w-full sm:flex-1"
          />
          <button type="submit" className="btn-primary shrink-0">
            검색
          </button>
          {(authorInput || authorName) && (
            <button
              type="button"
              onClick={clearAuthorSearch}
              className="btn-secondary shrink-0"
            >
              전체 보기
            </button>
          )}
        </div>
        {authorName && (
          <p role="status" className="mt-3 text-sm text-ink-sub wrap-anywhere">
            {authorName} 님의 메모
          </p>
        )}
      </form>

      {isLoading === true ? (
        <MemoListSkeletonComponent></MemoListSkeletonComponent>
      ) : isError === true ? (
        <div className="status" role="alert">
          <p className="status-title">메모를 불러오지 못했어요</p>
          <p className="status-desc">잠시 후 페이지를 새로 고침해 주세요.</p>
        </div>
      ) : authorName && memos.length === 0 ? (
        <p className="empty">이 이름으로 작성한 메모가 없어요.</p>
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
