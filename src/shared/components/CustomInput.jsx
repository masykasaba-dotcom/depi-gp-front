import React from "react";

export default function CustomInput({ id, label, errorMessage, ...props }) {
  // Check if it's email or password to apply the specific background from the new design
  const isSpecialInput = id === "email" || id === "password";

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label
        htmlFor={id}
        className="font-sans text-[10px] md:text-xs font-semibold text-[#444748] uppercase tracking-[0.15em] mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full border-0 border-b border-[#c4c7c7] font-sans text-base transition-colors focus:ring-0 focus:border-black focus:outline-none ${
          isSpecialInput
            ? "bg-[#e5e2dd]/20 px-3 pt-2 pb-2"
            : "bg-transparent px-0 pt-1 pb-2"
        }`}
      />
      {errorMessage && (
        <p className="text-[#ba1a1a] text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
