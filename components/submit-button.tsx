import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gradient-to-r gradient_secondary transition outline-none disabled:scale-100 disabled:bg-opacity-65 rounded-md"
    >
      {pending
        ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-stone-400" />
        )
        : (
          <>
            Submit{" "}
            <FaPaperPlane className="text-xs opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            {" "}
          </>
        )}
    </button>
  );
}
