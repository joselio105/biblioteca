import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { FieldContainer } from "./FieldContainer";

export interface Props {
  title: string;
  radios: IInptRadio[];
  errorMessage?: string;
}

export function FieldInputRadio({ title, errorMessage, radios }: Props) {
  return (
    <FieldContainer labelText={title} errorMessage={errorMessage}>
      <div className="flex items-center gap-2">
        {radios.map((radioProps, key) => {
          radioProps.inputProps.id = `${
            radioProps.inputProps.name ?? ""
          }${key}`;
          return <Radio {...radioProps} />;
        })}
      </div>
    </FieldContainer>
  );
}

export interface IInptRadio {
  labelText: string;
  labelIcon?: ReactNode;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

function Radio({ labelText, labelIcon, inputProps }: IInptRadio) {
  return (
    <div className="flex items-center gap-2 bg-primary-700 text-primary-400 mb-3 rounded shadow focus:outline-none">
      <input type="radio" className="sr-only peer" {...inputProps} />
      <label
        className={clsx(
          "flex items-center gap-2 p-2 rounded ",
          "peer-checked:ring-2 peer-checked:text-primary-200",
          {
            "peer-checked:ring-error-300 dark:peer-checked:ring-error-700":
              inputProps.value === "0",
            "peer-checked:ring-success-600 dark:peer-checked:ring-success-400":
              inputProps.value === "1",
            "peer-checked:ring-primary-500":
              inputProps.value !== "1" && inputProps.value !== "0",
          }
        )}
        htmlFor={inputProps.id}
      >
        {labelIcon ? labelIcon : ""}
        {labelText}
      </label>
    </div>
  );
}
