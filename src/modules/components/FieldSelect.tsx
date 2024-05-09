import { ReactNode, SelectHTMLAttributes } from "react";
import { FieldContainer } from "./FieldContainer";
import clsx from "clsx";

interface Props {
  labelText: string;
  icon?: ReactNode;
  errorMessage?: string;
  selectProps: SelectHTMLAttributes<HTMLSelectElement>;
  optionValues: { label: string; value: string }[];
  placeholder?: string;
}

export function FieldSelect({
  labelText,
  icon,
  errorMessage,
  selectProps,
  optionValues,
  placeholder,
}: Props) {
  return (
    <FieldContainer
      fieldId={selectProps.id ?? ""}
      labelText={labelText}
      errorMessage={errorMessage}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-primary-400">
        {icon ? icon : ""}
        <select
          className={clsx(
            "flex-1 text-sm font-medium p-3 rounded",
            " placeholder:text-primary-400 placeholder:font-light ring-0 outline-none",
            "bg-primary-100 dark:bg-primary-700",
            "text-primary-900 dark:text-primary-200"
          )}
          {...selectProps}
        >
          {placeholder ? <option value="">{placeholder}</option> : ""}
          {optionValues.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </FieldContainer>
  );
}
