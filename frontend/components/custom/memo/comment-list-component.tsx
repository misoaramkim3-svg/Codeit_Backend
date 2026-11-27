"use client";

import { useCommentsQuery } from "@/hooks/use-comments-query";
import { parseDiaryDate } from "@/lib/date";
import CommentFormComponent from "./comment-form-component";
import WriterComponent from "./writer-component";

const CommentListComponent = (props: { memoId: number }) => {
  const { data: comments, isLoading, isError } = useCommentsQuery(props.memoId);

  return (
    <section className="comments" aria-labelledby="comments-title">
      <h2 id="comments-title" className="comments-title">
        댓글{comments && comments.length > 0 && ` ${comments.length}`}
      </h2>

      {isLoading ? (
        <div role="status" aria-busy="true" className="mt-6">
          <span className="sr-only">댓글을 불러오는 중이에요</span>
          <div className="skeleton h-4 w-24" />
          <div className="skeleton mt-3 h-4 w-2/3" />
        </div>
      ) : isError ? (
        <p className="comments-empty" role="alert">
          댓글을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      ) : !comments || comments.length === 0 ? (
        <p className="comments-empty">아직 댓글이 없어요.</p>
      ) : (
        <ul className="mt-2">
          {comments.map((comment) => {
            const date = parseDiaryDate(comment.createdAt);
            return (
              <li key={comment.id} className="comment">
                <p className="meta flex items-center gap-2">
                  <WriterComponent
                    userId={comment.userId}
                    username={comment.username}
                  />
                  <time dateTime={comment.createdAt}>
                    {date.month}월 {date.day}일 {date.time}
                  </time>
                </p>
                <p className="comment-body">{comment.content}</p>
              </li>
            );
          })}
        </ul>
      )}

      <CommentFormComponent memoId={props.memoId} />
    </section>
  );
};

export default CommentListComponent;
