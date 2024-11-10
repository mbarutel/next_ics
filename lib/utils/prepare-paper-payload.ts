import {
  PaperFormikValuesType,
  PaperSubmissionPayloadType,
} from "../form-paper";
import dinnerParticipantsToString from "./dinner-participants-to-string";

export default function preparePaperPayload(
  formValues: PaperFormikValuesType,
): PaperSubmissionPayloadType {
  const date = new Date().toUTCString();
  const dinnerParticipants = dinnerParticipantsToString(
    formValues.dinnerParticipants,
  );

  const payload: PaperSubmissionPayloadType = {
    date,
    ...formValues,
    dinnerParticipants,
  };
  return payload;
}
