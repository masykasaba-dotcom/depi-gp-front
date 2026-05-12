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
      <div>
        <p className="font-medium mb-3">
          {questionId}. {questionTitle}
        </p>

        <div className="space-y-2">
          {options.map((option) => (
            <label
            key={option}
              htmlFor={option}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                id={option}
                type="radio"
                name={mappingKey}
                value={option}
                className="radio radio-info"
                defaultChecked={option === defaultValue}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        
        {error && <p className="mt-2 text-base text-red-500 font-medium">
          This field is required
        </p>}
      </div>
    );
  }

  if (questionType === "multiple_choice") {
    return (
      <div>
        <p className="font-medium mb-1">
          {questionId}. {questionTitle}
        </p>
        <p className="text-xs text-base-content/60 mb-3">
          (You can select more than one)
        </p>

        <div className="space-y-2">
          {options.map((option) => (
            <label
            key={option}
              htmlFor={option}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                id={option}
                type="checkbox"
                name={mappingKey}
                value={option}
                className="checkbox checkbox-info"
                defaultChecked={defaultValue && defaultValue.includes(option) ? true : false}
                
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {error && <p className="mt-2 text-base text-red-500 font-medium">
          This field is required
        </p>}
      </div>
    );
  }

  if (questionType === "scale") {
    return (
      <div>
        <p className="font-medium mb-3">
          {questionId}. {questionTitle}
        </p>

        <input
          type="range"
          min={0}
          max={options.length - 1}
          step={1}
          className="range range-info w-full"
          name={mappingKey}
          defaultValue={defaultValue ? defaultValue : 0}
        />

        <div className="flex justify-between text-xs mt-2 text-base-content/60">
          {options.map((option) => (
            <span key={option}>{option}</span>
          ))}
        </div>
      </div>
    );
  }
}
