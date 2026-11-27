export const getNowString = (now: Date) => {
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19);
};
