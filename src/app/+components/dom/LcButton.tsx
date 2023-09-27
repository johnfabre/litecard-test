interface LcButtonProps {
  className?: string;
  text?: string;
  icon?: string;
  onClick?: () => void;
}

export function LcButton({
  className = "",
  text,
  icon,
  onClick,
}: LcButtonProps) {
  return (
    <button
      className={`hover:bg-gray-50 hover:text-zinc-800 px-2 py-2 rounded flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {icon && <i className={`${icon} mr-2`}></i>}
      {text}
    </button>
  );
}
