import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  labelText?: string;
  fieldId?: string;
  errorMessage?: string;
}
export function FieldContainer({
  children,
  labelText,
  fieldId,
  errorMessage,
}: Props) {
  return (
    <div className="relative w-full flex flex-col p-3 gap-1 bg-primary-700 border border-primary-400 rounded-lg focus-within:ring-2 ring-secondary-500">
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
