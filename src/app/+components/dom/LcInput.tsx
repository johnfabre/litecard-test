import { InputHTMLAttributes } from "react";

interface LcInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function LcInput({ className = "", ...props }: LcInputProps) {
  return (
    <input
      className={`w-full p-2 border rounded text-black ${className}`}
      {...props}
    />
  );
}
