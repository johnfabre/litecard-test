interface LcPageTitleProps {
  title: string;
}

export function LcPageTitle({ title }: LcPageTitleProps) {
  return title && <div className="text-xl mb-8">{title}</div>;
}
