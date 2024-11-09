import { DinnerParticipantType } from "../types";

export default function dinnerParticipantsToString(
  dinnerParticipants: DinnerParticipantType[],
): string {
  if (dinnerParticipants.length === 0) {
    return "";
  }

  return dinnerParticipants
    .map((item) => item.name.trim().concat(` | ${item.diet}\n`))
    .join("\n");
}
