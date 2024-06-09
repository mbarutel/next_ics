import dayjs from "dayjs";

export default function HeaderDate({
  date,
}: {
  date: undefined | { startDate: Date; endDate: Date };
}) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <h2 className="header_subtext">
      {date ? (
        <>
          {dayjs(date.startDate).format("DD")} -{" "}
          {dayjs(date.endDate).format("DD MMMM, YYYY")}
        </>
      ) : (
        <>Date to be announced</>
      )}
    </h2>
  );
}
