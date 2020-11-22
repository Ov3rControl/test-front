import dayjs from "dayjs";

export const reverseUnixTime = (time: string) =>
  dayjs(new Date(Number(time) * 1000));
