const diaryDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const DATE_WITHOUT_OFFSET =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/;

export type DiaryDate = {
  year: number;
  month: number;
  day: number;
  weekday: string;
  time: string;
};

export const parseDiaryDate = (createdAt: string): DiaryDate => {
  // 시간대가 없는 기존 실습 데이터는 한국 시간으로 해석한다.
  const dateString = DATE_WITHOUT_OFFSET.test(createdAt)
    ? `${createdAt}+09:00`
    : createdAt;
  const parts = diaryDateFormatter.formatToParts(new Date(dateString));
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: Number(getPart("year")),
    month: Number(getPart("month")),
    day: Number(getPart("day")),
    weekday: getPart("weekday"),
    time: `${getPart("hour")}:${getPart("minute")}`,
  };
};

const padDatePart = (part: number) => String(part).padStart(2, "0");

export const monthKey = (createdAt: string) => {
  const { year, month } = parseDiaryDate(createdAt);
  return `${year}-${padDatePart(month)}`;
};

export const dayKey = (createdAt: string) => {
  const { year, month, day } = parseDiaryDate(createdAt);
  return `${year}-${padDatePart(month)}-${padDatePart(day)}`;
};

export const formatLongDate = (
  d: Pick<DiaryDate, "year" | "month" | "day" | "weekday">,
) => `${d.year}년 ${d.month}월 ${d.day}일 ${d.weekday}요일`;

export const formatToday = (now = new Date()) =>
  formatLongDate(parseDiaryDate(now.toISOString()));

export const todayKey = (now = new Date()) => dayKey(now.toISOString());
