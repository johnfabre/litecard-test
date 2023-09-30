interface LcButtonProps {
  className?: string;
  text?: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function LcButton({
  className = "",
  text,
  icon,
  onClick,
  disabled = false,
}: LcButtonProps) {
  return (
    <button
      className={`${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-gray-50 hover:text-zinc-800 active:bg-gray-300 active:text-violet-400"
      } p-1 md:p-2 rounded flex items-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <i className={`${icon}`}></i>}
      {text}
    </button>
  );
}
