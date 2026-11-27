"use client";

import FormMessageComponent from "@/components/custom/form/form-message-component";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCommentMutation } from "@/hooks/use-create-comment-mutation";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const MAX_CONTENT_LENGTH = 300;

const CommentFormComponent = (props: { memoId: number }) => {
  const [content, setContent] = useState<string>("");
  const { mutate, isPending, isError } = useCreateCommentMutation(props.memoId);

  const contentError =
    content.length > MAX_CONTENT_LENGTH
      ? `댓글은 ${MAX_CONTENT_LENGTH}자 이하로 입력해 주세요.`
      : "";
  const isEmpty = content.trim() === "";

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty || contentError) {
      return;
    }

    mutate(
      { content },
      {
        onSuccess: () => {
          setContent("");
        },
      },
    );
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit} noValidate>
      <Field data-invalid={!!contentError}>
        <FieldLabel htmlFor="comment-content" className="sr-only">
          댓글
        </FieldLabel>
        <Textarea
          value={content}
          onChange={handleChangeContent}
          id="comment-content"
          name="content"
          placeholder="댓글을 남겨 보세요."
          className="min-h-24 leading-relaxed"
          aria-invalid={!!contentError}
          aria-describedby="comment-content-message"
        />
        <FormMessageComponent
          id="comment-content-message"
          className="field-message"
          message={contentError}
        />
      </Field>
      <FormMessageComponent
        urgent
        className="form-error"
        message={isError ? "댓글을 저장하지 못했어요. 다시 시도해 주세요." : ""}
      />
      <div className="form-actions">
        <button
          type="submit"
          disabled={isEmpty || !!contentError || isPending}
          className="btn-primary"
        >
          {isPending && (
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
          )}
          {isPending ? "작성 중..." : "댓글 작성"}
        </button>
      </div>
    </form>
  );
};

export default CommentFormComponent;
