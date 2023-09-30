import { isNil } from "lodash-es";
import React, { InputHTMLAttributes } from "react";

interface LcOptionProps {
  value?: any;
  label: string;
}
interface LcSelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  onChange?: (value: any) => void;
  options: LcOptionProps[];
  emptyOptionLabel?: string;
  hideEmptyOption?: boolean;
  value?: any;
}

export function LcSelect({
  className = "",
  options,
  onChange,
  emptyOptionLabel = "",
  hideEmptyOption = false,
  ...props
}: LcSelectProps) {
  const emptypOption = <LcOption label={emptyOptionLabel} value="" />;

  const selectChanged = (event: React.ChangeEvent<HTMLSelectElement>) =>
    !isNil(onChange) && onChange(event.target.value);

  return (
    <select
      className={`w-full p-2 border rounded text-black ${className}`}
      onChange={selectChanged}
      {...props}
    >
      {!hideEmptyOption && !options && emptypOption}
      {options && (
        <>
          {!hideEmptyOption && emptypOption}
          {options.map((opt, index) => (
            <LcOption key={index} label={opt.label} value={opt.value} />
          ))}
        </>
      )}
    </select>
  );
}

function LcOption({ label, value }: LcOptionProps) {
  return <option value={value}>{label}</option>;
}
