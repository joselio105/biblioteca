import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  legendText: string;
  children: ReactNode;
  isHorizontal?: boolean;
}

export function Fieldset({
  legendText,
  children,
  isHorizontal = false,
}: Props) {
  return (
    <fieldset
      className={clsx(
        "flex flex-col gap-4 rounded-lg p-3 ",
        "bg-primary-200 dark:bg-primary-800",
        {
          "flex-col": isHorizontal === false,
          "flex-row": isHorizontal === true,
        }
      )}
    >
      <legend className="text-lg text-secondary-600 dark:text-secondary-400 px-3">
        {legendText}
      </legend>
      {children}
    </fieldset>
  );
}
