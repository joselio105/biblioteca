import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function GridRow({ children }: Props) {
  return <div className="grid grid-cols-8 gap-3">{children}</div>;
}
