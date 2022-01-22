const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function DDMMMYYYYTwelveHr(time: Date | number) {
  if (typeof time === "number") time = new Date(time);

  return `${time.getDate()} ${
    monthsShort[time.getMonth()]
  } ${time.getFullYear()} ${time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}
