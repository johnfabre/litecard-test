interface LcLoadingProps {
  customText?: string;
}

export function LcLoading({ customText }: LcLoadingProps) {
  return (
    <div className="w-full animate-pulse flex justify-center md:p-2">
      {customText || "Loading..."}
    </div>
  );
}
