import Link from "next/link";

type CTAButtonsProps = {
  conferenceSlug: string;
  showSubmitPaper?: boolean;
};

export default function CTAButtons({
  conferenceSlug,
  showSubmitPaper = true,
}: CTAButtonsProps) {
  return (
    <div className="border border-stone-800/50 rounded-sm p-8">
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href={`/forms/delegates?conference=${conferenceSlug}`}
          className="flex-1 min-w-[200px] max-w-xs bg-yellow-400 hover:bg-yellow-300 text-stone-900 font-semibold py-4 px-6 rounded-sm transition-colors text-center text-sm uppercase tracking-wider"
        >
          Register Now
        </Link>
        {showSubmitPaper && (
          <Link
            href={`/forms/speakers?conference=${conferenceSlug}`}
            className="flex-1 min-w-[200px] max-w-xs border border-yellow-400 hover:bg-yellow-400/10 text-yellow-400 font-semibold py-4 px-6 rounded-sm transition-colors text-center text-sm uppercase tracking-wider"
          >
            Submit Paper
          </Link>
        )}
      </div>
    </div>
  );
}
