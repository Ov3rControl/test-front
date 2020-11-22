export const getUnixTimestamp = (time: string) =>
  String(Math.round(new Date(time).getTime() / 1000));
