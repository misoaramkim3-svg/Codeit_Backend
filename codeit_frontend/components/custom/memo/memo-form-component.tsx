import FormMessageComponent from "@/components/custom/form/form-message-component";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, RotateCw } from "lucide-react";
import MemoImage from "./memo-image";
import { useEffect, useLayoutEffect, useState } from "react";

const PHOTO_URLS = [10, 15, 28, 29, 42, 64].map(
  (id) => `https://picsum.photos/id/${id}/800/600`,
);

const MAX_TITLE_LENGTH = 30;
const MAX_CONTENT_LENGTH = 1000;

const MemoFormComponent = (props: {
  createMemo: (title: string, content: string, imageUrl: string) => void;
  isPending: boolean;
  isError: boolean;
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(PHOTO_URLS[0]);
  const [photoUrls, setPhotoUrls] = useState<string[]>(PHOTO_URLS);

  useLayoutEffect(() => {
    return () => {
      setTitle("");
      setContent("");
      setImageUrl(PHOTO_URLS[0]);
      setPhotoUrls(PHOTO_URLS);
    };
  }, []);

  const refreshPhotoUrls = () => {
    setPhotoUrls((prev) => {
      return PHOTO_URLS.map(
        (v) =>
          `https://picsum.photos/seed/${Math.random().toString(36).slice(2)}/800/600`,
      );
    });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle((prev: string) => {
      return e.target.value;
    });
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent((prev: string) => {
      return e.target.value;
    });
  };
  const handleChangeImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl((prev: string) => {
      return e.target.value;
    });
  };

  const titleError =
    title.length > MAX_TITLE_LENGTH
      ? `제목은 ${MAX_TITLE_LENGTH}자 이하로 입력해 주세요.`
      : "";
  const contentError =
    content.length > MAX_CONTENT_LENGTH
      ? `내용은 ${MAX_CONTENT_LENGTH}자 이하로 입력해 주세요.`
      : "";
  const hasError = !!(titleError || contentError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasError) {
      return;
    }

    props.createMemo(title, content, imageUrl);
  };

  useEffect(() => {
    document.title = `(작성중) ${title}`;
  }, [title]);

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel>사진</FieldLabel>
          <button type="button" onClick={refreshPhotoUrls} className="btn-text">
            <RotateCw className="size-3.5" aria-hidden />
            새로고침
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {photoUrls.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => setImageUrl(url)}
              className={`relative aspect-[4/3] overflow-hidden bg-paper-soft transition hover:opacity-90 ${
                url === imageUrl ? "ring-2 ring-point ring-offset-2" : ""
              }`}
            >
              <MemoImage
                src={url}
                alt=""
                fill
                sizes="220px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </Field>
      <Field data-invalid={!!titleError}>
        <FieldLabel htmlFor="memo-title">제목</FieldLabel>
        <Input
          value={title}
          onChange={handleChangeTitle}
          id="memo-title"
          name="title"
          type="text"
          aria-invalid={!!titleError}
          aria-describedby="memo-title-message"
        />
        <FormMessageComponent
          id="memo-title-message"
          className="field-message"
          message={titleError}
        />
      </Field>
      <Field data-invalid={!!contentError}>
        <FieldLabel htmlFor="memo-content">내용</FieldLabel>
        <Textarea
          value={content}
          onChange={handleChangeContent}
          id="memo-content"
          name="content"
          className="min-h-60 leading-relaxed"
          aria-invalid={!!contentError}
          aria-describedby="memo-content-message"
        />
        <FormMessageComponent
          id="memo-content-message"
          className="field-message"
          message={contentError}
        />
      </Field>
      <div>
        <FormMessageComponent
          urgent
          className="form-error"
          message={
            props.isError ? "메모를 저장하지 못했어요. 다시 시도해 주세요." : ""
          }
        />
        <div className="form-actions">
          <button
            type="submit"
            disabled={hasError || props.isPending}
            className="btn-primary"
          >
            {props.isPending && (
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
            )}
            {props.isPending ? "작성 중..." : "메모작성하기"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MemoFormComponent;
