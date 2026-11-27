const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export type DiaryDate = {
  year: number;
  month: number;
  day: number;
  weekday: string;
  time: string;
};

export const parseDiaryDate = (createdAt: string): DiaryDate => {
  const year = Number(createdAt.slice(0, 4));
  const month = Number(createdAt.slice(5, 7));
  const day = Number(createdAt.slice(8, 10));
  const weekday =
    WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return { year, month, day, weekday, time: createdAt.slice(11, 16) };
};

export const monthKey = (createdAt: string) => createdAt.slice(0, 7);

export const dayKey = (createdAt: string) => createdAt.slice(0, 10);

export const formatLongDate = (
  d: Pick<DiaryDate, "year" | "month" | "day" | "weekday">,
) => `${d.year}년 ${d.month}월 ${d.day}일 ${d.weekday}요일`;

export const formatToday = () => {
  const now = new Date();
  return formatLongDate({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    weekday: WEEKDAYS[now.getDay()],
  });
};

export const todayKey = () => {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
};
