import { AgendaType } from "@/lib/types";

export function parseAgenda(
  agenda: unknown,
): AgendaType[] {
  if (agenda && Array.isArray(agenda)) {
    for (let i = 0; i < agenda.length; i++) {
      if (!("title" in agenda[i]) || !("row" in agenda[i])) {
        return [];
      }
    }
    return agenda;
  } else {
    return [];
  }
}
