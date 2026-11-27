"use client";

import { parseDiaryDate } from "@/lib/date";
import type { MemoType } from "@backend/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import WriterComponent from "./writer-component";

const MemoFeatureComponent = (props: { memos: MemoType[] }) => {
  const stripRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const strip = stripRef.current;
    if (strip === null) {
      return;
    }
    strip.scrollBy({ left: strip.clientWidth * 0.8 * direction });
  };

  if (props.memos.length === 0) {
    return null;
  }

  return (
    <section className="feature" aria-label="최근 메모">
      <div ref={stripRef} className="feature-strip">
        {props.memos.map((memo, i) => {
          const date = parseDiaryDate(memo.createdAt);
          return (
            <Link
              key={memo.id}
              href={`/memos/${memo.id}`}
              className="feature-card group"
            >
              <Image
                src={memo.imageUrl}
                alt=""
                fill
                sizes="(min-width: 640px) 560px, 78vw"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="feature-overlay">
                <time className="feature-date" dateTime={memo.createdAt}>
                  {date.month}월 {date.day}일 {date.weekday}요일
                </time>
                <h2 className="feature-title">{memo.title}</h2>
                <p className="feature-writer">
                  <WriterComponent
                    userId={memo.userId}
                    username={memo.username}
                    onDark
                  />
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="feature-nav">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="feature-nav-button"
          aria-label="이전 메모 보기"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="feature-nav-button"
          aria-label="다음 메모 보기"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
};

export default MemoFeatureComponent;
