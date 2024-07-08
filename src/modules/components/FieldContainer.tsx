import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  labelText?: string;
  fieldId?: string;
  errorMessage?: string;
  className?: string;
}
export function FieldContainer({
  children,
  labelText,
  fieldId,
  errorMessage,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "relative w-full flex flex-col p-3 gap-1 rounded-lg border focus-within:ring-2 border-primary-500",
        "bg-primary-300",
        "dark:bg-primary-700",
        "ring-secondary-500",
        className
      )}
    >
      {labelText ? (
        <label
          className="absolute -top-2 left-3 text-xs text-primary-400 bg-primary-700 rounded px-2"
          htmlFor={fieldId}
        >
          {labelText}
        </label>
      ) : (
        ""
      )}
      {children}
      {errorMessage ? (
        <span className="absolute -bottom-4 z-10 left-0 w-full bg-error-700 text-error-200 text-sm font-light py-2 px-3 rounded">
          {errorMessage}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
