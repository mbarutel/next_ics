type ParserConferenceDateProps = {
  startDate: string | undefined;
  endDate: string | undefined;
};
export default function parserConferenceDate(
  { startDate, endDate }: ParserConferenceDateProps,
): { startDate: Date; endDate: Date } | undefined {
  if (!startDate || !endDate) {
    return undefined;
  }

  return {
    startDate,
    endDate,
  };
}
