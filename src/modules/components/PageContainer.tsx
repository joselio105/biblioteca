import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PageContainer({ children }: Props) {
  return <div className="w-screen min-h-screen bg-stone-900">{children}</div>;
}
