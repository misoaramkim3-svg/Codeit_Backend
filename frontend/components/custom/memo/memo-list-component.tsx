import { dayKey, monthKey, parseDiaryDate } from "@/lib/date";
import type { MemoType } from "@backend/types";
import MemoEntryComponent from "./memo-entry-component";

const groupByMonth = (memos: MemoType[]) => {
  const groups: { key: string; memos: MemoType[] }[] = [];
  for (const memo of memos) {
    const key = monthKey(memo.createdAt);
    const last = groups.at(-1);
    if (last?.key === key) {
      last.memos.push(memo);
    } else {
      groups.push({ key, memos: [memo] });
    }
  }
  return groups;
};

const MemoListComponent = (props: { memos: MemoType[] }) => {
  if (props.memos.length === 0) {
    return (
      <p className="empty">
        아직 아무도 쓰지 않았어요. 첫 페이지를 채워 주세요.
      </p>
    );
  }

  return (
    <div>
      {groupByMonth(props.memos).map((group) => {
        const { year, month } = parseDiaryDate(group.memos[0].createdAt);
        return (
          <section key={group.key} aria-label={`${year}년 ${month}월`}>
            <h2 className="timeline-month">
              {year}년 {month}월
            </h2>
            {group.memos.map((memo, i) => (
              <MemoEntryComponent
                key={memo.id}
                memo={memo}
                showDate={
                  i === 0 ||
                  dayKey(group.memos[i - 1].createdAt) !==
                    dayKey(memo.createdAt)
                }
              />
            ))}
          </section>
        );
      })}
    </div>
  );
};

export default MemoListComponent;
