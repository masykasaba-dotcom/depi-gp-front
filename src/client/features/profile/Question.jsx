import React from "react";

export default function Question({
  questionId,
  questionTitle,
  questionType,
  options,
  mappingKey,
  error,
  defaultValue
}) {
  if (questionType === "single_choice") {
    return (
      <div className="mb-8">
        <p className="font-display-lg text-[18px] text-[#06373A] mb-4">
          <span className="text-[#aab7c4] mr-2 text-[14px]">0{questionId}</span> {questionTitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((option) => (
            <label
              key={option}
              htmlFor={`${mappingKey}-${option}`}
              className="flex items-center gap-3 p-4 border border-[#E8E4DE] rounded-xl cursor-pointer hover:border-[#06373A] transition-colors bg-white has-[:checked]:border-[#06373A] has-[:checked]:bg-[#06373A]/5"
            >
              <input
                id={`${mappingKey}-${option}`}
                type="radio"
                name={mappingKey}
                value={option}
                className="w-4 h-4 text-[#06373A] border-gray-300 focus:ring-[#06373A]"
                defaultChecked={option === defaultValue}
              />
              <span className="text-[14px] text-[#06373A] font-medium">{option}</span>
            </label>
          ))}
        </div>
        
        {error && <p className="mt-2 text-[13px] text-red-500 font-medium">This field is required</p>}
      </div>
    );
  }

  if (questionType === "multiple_choice") {
    return (
      <div className="mb-8">
        <div className="mb-4">
          <p className="font-display-lg text-[18px] text-[#06373A]">
            <span className="text-[#aab7c4] mr-2 text-[14px]">0{questionId}</span> {questionTitle}
          </p>
          <p className="text-[12px] text-[#555a5b] mt-1 ml-6">
            (You can select more than one)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((option) => (
            <label
              key={option}
              htmlFor={`${mappingKey}-${option}`}
              className="flex items-center gap-3 p-4 border border-[#E8E4DE] rounded-xl cursor-pointer hover:border-[#06373A] transition-colors bg-white has-[:checked]:border-[#06373A] has-[:checked]:bg-[#06373A]/5"
            >
              <input
                id={`${mappingKey}-${option}`}
                type="checkbox"
                name={mappingKey}
                value={option}
                className="w-4 h-4 text-[#06373A] rounded border-gray-300 focus:ring-[#06373A]"
                defaultChecked={defaultValue && defaultValue.includes(option) ? true : false}
              />
              <span className="text-[14px] text-[#06373A] font-medium">{option}</span>
            </label>
          ))}
        </div>
        {error && <p className="mt-2 text-[13px] text-red-500 font-medium">This field is required</p>}
      </div>
    );
  }

  if (questionType === "scale") {
    return (
      <div className="mb-8">
        <p className="font-display-lg text-[18px] text-[#06373A] mb-6">
          <span className="text-[#aab7c4] mr-2 text-[14px]">0{questionId}</span> {questionTitle}
        </p>

        <div className="px-2">
          <input
            type="range"
            min={0}
            max={options.length - 1}
            step={1}
            className="w-full h-1.5 bg-[#E8E4DE] rounded-lg appearance-none cursor-pointer accent-[#06373A]"
            name={mappingKey}
            defaultValue={defaultValue ? defaultValue : 0}
          />

          <div className="flex justify-between text-[11px] font-bold tracking-wider uppercase text-[#555a5b] mt-4">
            {options.map((option) => (
              <span key={option}>{option}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
