import { InputHTMLAttributes } from "react";

interface LcSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string | undefined;
    label: string;
  }[];
}

export function LcSelect({ className = "", options, ...props }: LcSelectProps) {
  return (
    <select
      className={`w-full p-2 border rounded text-black ${className}`}
      {...props}
    >
      <option></option>
      {options &&
        options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
    </select>
  );
}
