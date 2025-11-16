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
    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-4 sm:p-6 mb-6 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Date */}
        {startDate && endDate && (
          <div>
            <div className="text-xs font-semibold text-stone-800 uppercase tracking-wide">
              Date
            </div>
            <div className="text-sm font-bold text-stone-900">
              {dayjs(startDate).format("MMM D")} -{" "}
              {dayjs(endDate).format("MMM D, YYYY")}
            </div>
          </div>
        )}

        {/* Venue */}
        {venue && (
          <div>
            <div className="text-xs font-semibold text-stone-800 uppercase tracking-wide">
              Venue
            </div>
            <div className="text-sm font-bold text-stone-900">{venue}</div>
          </div>
        )}

        {/* Call for Papers */}
        {conference.submitPaperLink && (
          <div>
            <div className="text-xs font-semibold text-stone-800 uppercase tracking-wide">
              Call for Papers
            </div>
            <div className="text-sm font-bold text-stone-900">Open</div>
            <div className="text-xs text-stone-700">Submit now</div>
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/forms/delegates?conference=${conference.slug}`}
          className="flex-1 bg-stone-900 hover:bg-stone-800 text-yellow-400 font-bold py-3 px-4 sm:px-6 rounded-md transition-all duration-200 text-center hover:scale-105 shadow-md text-sm sm:text-base"
        >
          Register Now
        </Link>
        {conference.submitPaperLink && (
          <Link
            href={`/forms/speakers?conference=${conference.slug}`}
            className="flex-1 bg-white hover:bg-stone-100 text-stone-900 font-bold py-3 px-4 sm:px-6 rounded-md transition-all duration-200 text-center hover:scale-105 shadow-md border-2 border-stone-900 text-sm sm:text-base"
          >
            Submit Paper
          </Link>
        )}
      </div>
    </div>
  );
}
