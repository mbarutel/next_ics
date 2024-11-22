import clsx from "clsx";

type SubmitButtonProps = {
  isSubmitting: boolean;
};
export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={clsx("button_primary bg-yellow-400 mt-6 w-full", {
        "hover:bg-yellow-400 hover:text-black": isSubmitting,
      })}
    >
      {!isSubmitting ? "Submit" : "Submitting..."}
    </button>
  );
}
