import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitFormButton({ tempTitle, tile }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full bg-black text-white font-sans text-[10px] md:text-xs font-semibold py-4 md:py-5 uppercase tracking-[0.2em] md:tracking-widest hover:bg-[#444748] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? tempTitle : tile}
    </button>
  );
}
