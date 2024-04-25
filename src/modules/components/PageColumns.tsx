import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  columns?: number;
}

export function PageColumns({ children, columns = 2 }: Props) {
  return (
    <div
      className={clsx(`bg-stone-700 p-3 rounded-lg mb-4 grid`, {
        "grid-cols-1": columns === 1,
        "grid-cols-2": columns === 2,
        "grid-cols-3": columns === 3,
        "grid-cols-4": columns === 4,
        "grid-cols-5": columns >= 5,
      })}
    >
      {children}
    </div>
  );
}
