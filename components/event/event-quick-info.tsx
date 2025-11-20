import { EventType } from "@/lib/types";
import dayjs from "dayjs";
import Link from "next/link";

export default function EventQuickInfo({ event }: { event: EventType }) {
  if (!event.conference) return null;

  const { conference } = event;
  const startDate = conference.date?.startDate;
  const endDate = conference.date?.endDate;
  const venue = conference.venue;

  return (
    <div className="border border-stone-800/50 bg-stone-700/10 rounded-sm p-8 sm:p-10">
      {/* Event Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-10">
        {/* Date */}
        {startDate && endDate && (
          <div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">
              Date
            </div>
            <div className="text-base sm:text-lg font-medium text-stone-100">
              {dayjs(startDate).format("MMM D")} -{" "}
              {dayjs(endDate).format("MMM D, YYYY")}
            </div>
          </div>
        )}

        {/* Venue */}
        {venue && (
          <div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">
              Venue
            </div>
            <div className="text-base sm:text-lg font-medium text-stone-100">{venue}</div>
          </div>
        )}

        {/* Call for Papers */}
        {conference.submitPaperLink && (
          <div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">
              Call for Papers
            </div>
            <div className="text-base sm:text-lg font-medium text-stone-100">Open</div>
            <div className="text-xs text-stone-400 mt-1">Accepting submissions</div>
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/forms/delegates?conference=${conference.slug}`}
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-stone-900 font-semibold py-4 px-6 rounded-sm transition-colors text-center text-sm uppercase tracking-wider"
        >
          Register Now
        </Link>
        {conference.submitPaperLink && (
          <Link
            href={`/forms/speakers?conference=${conference.slug}`}
            className="flex-1 border border-yellow-400 hover:bg-yellow-400/10 text-yellow-400 font-semibold py-4 px-6 rounded-sm transition-colors text-center text-sm uppercase tracking-wider"
          >
            Submit Paper
          </Link>
        )}
      </div>
    </div>
  );
}
