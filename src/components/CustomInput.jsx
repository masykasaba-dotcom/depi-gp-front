import React from "react";

export default function CustomInput({ id, label,errorMessage, ...props }) {
  return (
    <div className="mt-6">
      <label
        htmlFor={id}
        className="text-[#74777D] text-[10px] font-normal mb-2 w-full"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="text-base font-normal py-3 outline-0 border-b boder-b-[#C4C6CD] w-full"
        
      />
      <p className="text-red-500 text-xs mt-1">
        {errorMessage}
      </p>
    </div>
  );
}
