import { isEmpty } from "lodash-es";

interface LcLabelValueProps {
  label: string;
  value: string;
  valueWhenBlank?: string;
}

export function LcLabelValue({
  label,
  value,
  valueWhenBlank = "-",
}: LcLabelValueProps) {
  return (
    <div className="mb-4">
      <label className="block text-md font-bold mb-2">{label}</label>
      <p>{isEmpty(value) ? valueWhenBlank : value}</p>
    </div>
  );
}
