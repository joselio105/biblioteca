import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  type?: "h2" | "h3" | "h4";
}

export function PageHeading({ className = "", children, type = "h2" }: Props) {
  return (
    <h2
      className={clsx(
        {
          "text-lg text-blue-400 mb-4": type === "h2",
          "text-blue-300 my-3": type === "h3",
        },
        className
      )}
    >
      {children}
    </h2>
  );
}
