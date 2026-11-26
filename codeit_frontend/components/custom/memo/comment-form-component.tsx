"use client";

import { createCommentApi } from "@/api/memos-api";
import FormMessageComponent from "@/components/custom/form/form-message-component";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";

export default function CommentFormComponent({ memoId }: { memoId: number }) {
  const [content, setContent] = useState("");
  const comment = useMutation({
    mutationFn: (text: string) => createCommentApi(memoId, { content: text }),
    onSuccess: () => setContent(""),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = content.trim();
    if (text && !comment.isPending) {
      comment.mutate(text);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 space-y-3 border-t border-line pt-6"
    >
      <label htmlFor="comment-content" className="form-title">
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
  );
}
