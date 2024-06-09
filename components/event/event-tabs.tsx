import { AgendaType, MasterclassType } from "@/lib/types";
import clsx from "clsx";

type TabsProps = {
  tab: string;
  setTab: React.Dispatch<
    React.SetStateAction<"Conference" | "Agenda" | "Masterclass">
  >;
  agenda: AgendaType[] | null;
  masterclass: MasterclassType[] | null;
};
export default function EventTabs({
  tab,
  setTab,
  agenda,
  masterclass,
}: TabsProps) {
  return (
    <div className="event_tabs_wrapper">
      <button
        onClick={() => setTab("Conference")}
        className={clsx(
          "event_tab_text px-3 bg-stone-800/80 font-extrabold py-3 rounded-md sm:rounded-b-none transition_config",
          {
            "bg-gradient-to-r gradient text-stone-800 rounded-md sm:rounded-b-none":
              tab === "Conference",
            "sm:border-b-2 sm:border-stone-900 hover:-translate-y-1":
              tab !== "Conference",
          },
        )}
      >
        Conference
      </button>
      {agenda && (
        <button
          onClick={() => setTab("Agenda")}
          className={clsx(
            "event_tab_text px-3 bg-stone-800/80 font-extrabold py-3 rounded-md sm:rounded-b-none transition_config",
            {
              "bg-gradient-to-r gradient text-stone-800 rounded-md sm:rounded-b-none":
                tab === "Agenda",
              "sm:border-b-2 sm:border-stone-900 hover:-translate-y-1":
                tab !== "Agenda",
            },
          )}
        >
          Agenda
        </button>
      )}
      {masterclass && (
        <button
          onClick={() => setTab("Masterclass")}
          className={clsx(
            "event_tab_text px-3 bg-stone-800/80 font-extrabold py-3 rounded-md sm:rounded-b-none transition_config",
            {
              "bg-gradient-to-r gradient text-stone-800 rounded-md sm:rounded-b-none":
                tab === "Masterclass",
              "sm:border-b-2 sm:border-stone-900 hover:-translate-y-1":
                tab !== "Masterclass",
            },
          )}
        >
          Masterclass
        </button>
      )}
    </div>
  );
}
