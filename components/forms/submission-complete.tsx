import Link from "next/link";

export default function SubmissionComplete() {
  return (
    <div className="absolute inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 px-8 py-10 text-slate-700 flex_col items-center">
        <h1 className="text-4xl font-semibold text-center">
          Thank you for joining us! We’re taking care of your registration and
          will follow up shortly.
        </h1>
        <Link
          href="/"
          className="mt-5 button bg-stone-700 hover:bg-opacity-0 text-white hover:text-stone-700 border-stone-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
