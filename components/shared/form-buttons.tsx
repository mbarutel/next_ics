import Link from "next/link";

type CallToActionBtnsProps = {
  registration: string;
  submitPaper?: string;
};
export default function FormButtons({
  registration,
  submitPaper,
}: CallToActionBtnsProps) {
  return (
    <div className="flex_center">
      <Link
        href={registration}
        className="btn_primary bg-yellow-400 text-stone-900"
      >
        Register
      </Link>
      {submitPaper && (
        <Link href={submitPaper} className="btn_secondary text-white">
          Submit A Paper
        </Link>
      )}
    </div>
  );
}
