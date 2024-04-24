import { ReactNode } from "react";

interface Props {
  label?: string;
  children?: ReactNode;
}

export function TextLabeled({ label, children }: Props) {
  return children ? (
    <span className="relative text-lg pt-5">
      {label ? (
        <small className="text-stone-400 text-sm absolute top-0 left-0">
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
