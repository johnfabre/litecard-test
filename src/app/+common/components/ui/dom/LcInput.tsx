import React, { InputHTMLAttributes, useState } from "react";
import { LcButton } from "./LcButton";

interface LcInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  buttonIcon?: string;
}

export function LcInput({
  className = "",
  buttonIcon,
  onChange,
  onKeyDown,
  ...props
}: LcInputProps) {
  const [inputVal, setInputVal] = useState("");

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onChange(val);
    setInputVal(val);
  };

  const buttonClick = () =>
    onKeyDown &&
    onKeyDown({
      key: "Enter",
      target: {
        value: inputVal,
      },
    } as any);

  return (
    <div className="relative">
      <input
        className={`w-full p-2 border rounded text-black ${className}`}
        onChange={inputChanged}
        onKeyDown={onKeyDown}
        {...props}
      />
      {buttonIcon && (
        <LcButton
          className="absolute top-1 right-1 text-gray-500"
          icon={buttonIcon}
          onClick={buttonClick}
        />
      )}
    </div>
  );
}
