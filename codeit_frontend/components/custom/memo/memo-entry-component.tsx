import { dayKey, formatLongDate, parseDiaryDate, todayKey } from "@/lib/date";
import type { MemoType } from "@/types";
import MemoImage from "./memo-image";
import Link from "next/link";
import WriterComponent from "./writer-component";

const MemoEntryComponent = (props: { memo: MemoType; showDate: boolean }) => {
  const { memo } = props;
  const date = parseDiaryDate(memo.createdAt);
  const isToday = dayKey(memo.createdAt) === todayKey();

  return (
    <Link href={`/memos/${memo.id}`} className="entry group">
      <div
        className={isToday ? "entry-date entry-date-today" : "entry-date"}
        aria-hidden
      >
        {props.showDate && (
          <>
            <span className="entry-day">{date.day}</span>
            <span className="entry-weekday">
              {isToday ? "오늘" : `${date.weekday}요일`}
            </span>
          </>
        )}
      </div>

      <article className="entry-content">
        <h3 className="entry-title">{memo.title}</h3>
        <p className="entry-body">{memo.content}</p>
        <p className="meta mt-3">
          <WriterComponent userId={memo.userId} username={memo.username} /> ·{" "}
          <time dateTime={memo.createdAt}>
            <span className="sr-only">{formatLongDate(date)} </span>
            {date.time}
          </time>
        </p>
      </article>

      <div className="entry-thumb">
        <MemoImage
          src={memo.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 288px, (min-width: 640px) 160px, 88px"
        />
      </div>
    </Link>
  );
};

export default MemoEntryComponent;
