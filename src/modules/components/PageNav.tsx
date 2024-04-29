import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PageNav({ children }: Props) {
  return (
    <nav className="flex items-center justify-end gap-3 mb-4">{children}</nav>
  );
}
