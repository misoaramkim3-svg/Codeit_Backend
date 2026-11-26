"use client";

import { createCommentApi, loadMemoCommentsApi } from "@/api/memos-api";
import FormMessageComponent from "@/components/custom/form/form-message-component";
import { Textarea } from "@/components/ui/textarea";
import { formatLongDate, parseDiaryDate } from "@/lib/date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import WriterComponent from "./writer-component";

export default function MemoCommentsComponent({ memoId }: { memoId: number }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const queryKey = ["memos", memoId, "comments"];
  const comments = useQuery({
    queryKey,
    queryFn: ({ signal }) => loadMemoCommentsApi(memoId, signal),
  });
  const comment = useMutation({
    mutationFn: (text: string) => createCommentApi(memoId, { content: text }),
    onSuccess: () => {
      setContent("");
      return queryClient.invalidateQueries({ queryKey });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = content.trim();
    if (text && !comment.isPending) {
      comment.mutate(text);
    }
  }

  return (
    <section
      aria-labelledby="memo-comments-heading"
      className="mt-12 space-y-5 border-t border-line pt-6"
    >
      <h2 id="memo-comments-heading" className="form-title">
        댓글
      </h2>
      {comments.isPending && <p role="status">댓글을 불러오는 중이에요.</p>}
      {comments.isError && (
        <FormMessageComponent
          urgent
          message="댓글을 불러오지 못했어요."
          action={
            <button
              type="button"
              className="form-message-link"
              onClick={() => comments.refetch()}
            >
              다시 불러오기
            </button>
          }
        />
      )}
      {!comments.isError && comments.data?.length === 0 && (
        <p className="meta">아직 댓글이 없어요.</p>
      )}
      {comments.data && comments.data.length > 0 && (
        <ul className="divide-y divide-line" aria-label="댓글 목록">
          {comments.data.map((item) => {
            const date = parseDiaryDate(item.createdAt);
            return (
              <li key={item.id} className="space-y-2 py-4">
                <div className="meta flex flex-wrap items-center gap-x-3 gap-y-1">
                  <WriterComponent
                    userId={item.userId}
                    username={item.username}
                  />
                  <time dateTime={item.createdAt}>
                    {formatLongDate(date)} · {date.time}
                  </time>
                </div>
                <p className="wrap-break-word whitespace-pre-wrap">
                  {item.content}
                </p>
              </li>
            );
          })}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="comment-content" className="sr-only">
          댓글
        </label>
        <Textarea
          id="comment-content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            comment.reset();
          }}
          maxLength={1000}
          rows={3}
          required
          disabled={comment.isPending}
          placeholder="댓글을 입력해 주세요"
        />
        {comment.isSuccess && <p role="status">댓글을 등록했어요.</p>}
        {comment.isError && (
          <FormMessageComponent
            urgent
            message="댓글을 등록하지 못했어요. 다시 시도해 주세요."
          />
        )}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={comment.isPending || !content.trim()}
          >
            {comment.isPending ? "등록 중..." : "댓글 작성"}
          </button>
        </div>
      </form>
    </section>
  );
}
