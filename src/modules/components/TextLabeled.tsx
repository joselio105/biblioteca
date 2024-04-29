import { ReactNode } from "react";

interface Props {
  label?: string;
  children?: ReactNode;
}

export function TextLabeled({ label, children }: Props) {
  return children ? (
    <span className="text-lg flex flex-col gap-2">
      {label ? (
        <small className="text-primary-600 dark:text-primary-400 text-sm">
          {label}
        </small>
      ) : (
        ""
      )}
      {children}
    </span>
  ) : (
    ""
  );
}
