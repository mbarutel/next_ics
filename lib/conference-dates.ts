import dayjs from "dayjs";

export default function conferenceDate({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}) {
  if (!startDate || !endDate) {
    return null;
  }

  return `${dayjs(startDate).format("DD - ")} ${dayjs(endDate).format("DD MMMM YY")}`;
}
