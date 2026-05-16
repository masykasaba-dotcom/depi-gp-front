import React from "react";
export default function Button({ text }) {
  return (
    <button
      type="button"
      className="btn mt-6 w-full rounded-xl border-0 bg-[#272727] text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#1a1a1a]"
    >
      {" "}
      {text}{" "}
    </button>
  );
}
