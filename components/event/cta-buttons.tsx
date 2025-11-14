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
    <div className="flex flex-wrap gap-4 my-8 justify-center">
      <Link
        href={`/forms/delegates?conference=${conferenceSlug}`}
        className="flex-1 min-w-[200px] max-w-xs bg-yellow-400 hover:bg-yellow-500 text-stone-900 font-bold py-3 px-6 rounded-md transition-all duration-200 text-center hover:scale-105 shadow-md"
      >
        Register Now
      </Link>
      {showSubmitPaper && (
        <Link
          href={`/forms/speakers?conference=${conferenceSlug}`}
          className="flex-1 min-w-[200px] max-w-xs bg-stone-900 hover:bg-stone-800 text-yellow-400 font-bold py-3 px-6 rounded-md transition-all duration-200 text-center hover:scale-105 shadow-md border-2 border-yellow-400"
        >
          Submit Paper
        </Link>
      )}
    </div>
  );
}
