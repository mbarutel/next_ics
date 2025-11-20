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
    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-6 sm:p-8 shadow-lg">
      {/* Event Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
        {/* Date */}
        {startDate && endDate && (
          <div className="border-l-4 border-stone-900 pl-4">
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
              Date
            </div>
            <div className="text-base sm:text-lg font-bold text-stone-900">
              {dayjs(startDate).format("MMM D")} -{" "}
              {dayjs(endDate).format("MMM D, YYYY")}
            </div>
          </div>
        )}

        {/* Venue */}
        {venue && (
          <div className="border-l-4 border-stone-900 pl-4">
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
              Venue
            </div>
            <div className="text-base sm:text-lg font-bold text-stone-900">{venue}</div>
          </div>
        )}

        {/* Call for Papers */}
        {conference.submitPaperLink && (
          <div className="border-l-4 border-stone-900 pl-4">
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
              Call for Papers
            </div>
            <div className="text-base sm:text-lg font-bold text-stone-900">Open</div>
            <div className="text-xs text-stone-700 mt-1">Accepting submissions</div>
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={`/forms/delegates?conference=${conference.slug}`}
          className="flex-1 bg-stone-900 hover:bg-stone-800 text-yellow-400 font-bold py-4 px-6 rounded-md transition-all duration-200 text-center hover:scale-105 shadow-md text-base uppercase tracking-wide"
        >
          Register Now
        </Link>
        {conference.submitPaperLink && (
          <Link
            href={`/forms/speakers?conference=${conference.slug}`}
            className="flex-1 bg-white hover:bg-stone-100 text-stone-900 font-bold py-4 px-6 rounded-md transition-all duration-200 text-center hover:scale-105 shadow-md border-2 border-stone-900 text-base uppercase tracking-wide"
          >
            Submit Paper
          </Link>
        )}
      </div>
    </div>
  );
}
