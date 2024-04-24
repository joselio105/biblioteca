import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function PageHeading({ className = "", children }: Props) {
  return (
    <h2 className={`text-lg text-blue-200 mb-4 ${className}`}>{children}</h2>
  );
}
