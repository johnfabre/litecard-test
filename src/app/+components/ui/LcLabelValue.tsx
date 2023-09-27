interface LcLabelValueProps {
  label: string;
  value: string;
}

export function LcLabelValue({ label, value }: LcLabelValueProps) {
  return (
    <div className="mb-4">
      <label className="block text-emerald-700 text-sm font-bold mb-2">
        {label}
      </label>
      <p>{value}</p>
    </div>
  );
}
