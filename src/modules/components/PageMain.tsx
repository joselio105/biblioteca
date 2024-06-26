import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PageMain({ children }: Props) {
  return (
    <main className="max-w-7xl w-full mx-auto px-4 lg:px-0 py-4 text-primary-800 dark:text-primary-200">
      {children}
    </main>
  );
}
