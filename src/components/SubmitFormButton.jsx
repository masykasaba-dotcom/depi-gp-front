import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitFormButton({tempTitle,tile}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
          className="btn btn-neutral w-full mt-8 mb-8 rounded-xl text-xs font-semibold uppercase tracking-widest text-neutral-content"
          disabled={pending}
    >
      {pending ? tempTitle : tile}
    </button>
  );
}
