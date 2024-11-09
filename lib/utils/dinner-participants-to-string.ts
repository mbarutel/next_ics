import { DinnerParticipantType } from "../types";

export default function dinnerParticipantsToString(
  dinnerParticipants: DinnerParticipantType[],
): string {
  return dinnerParticipants
    .map((item) => item.name.trim().concat(` | ${item.diet}\n`))
    .join("\n");
}
