import clsx from "clsx";
import { FieldContainer } from "./FieldContainer";
import { IFieldInputRadio } from "../types/fieldInputRadio";

export function FieldInputRadio({
  title,
  defaultValue,
  errorMessage,
  radios,
  canRender = true,
  setValue,
  register,
}: IFieldInputRadio) {
  return canRender ? (
    <FieldContainer labelText={title} errorMessage={errorMessage}>
      <div className="flex items-center gap-3">
        {radios.map(({ value, labelText, labelIcon }, key) => (
          <div className="flex items-center gap-3">
            <input
              type="radio"
              value={value}
              id={register.name + key}
              name={register.name}
              checked={defaultValue === value}
              onClick={(event) =>
                setValue(register.name, event.currentTarget.value)
              }
              onChange={(event) =>
                setValue(register.name, event.currentTarget.value)
              }
              className="sr-osnly peer hidden"
            />
            <label
              key={key}
              htmlFor={register.name + key}
              className={clsx(
                "flex items-center gap-2 mb-3 rounded shadow focus:outline-none p-2",
                "bg-primary-200 text-primary-400 dark:bg-primary-800",
                "peer-checked:text-primary-200 peer-checked:ring",
                {
                  "peer-checked:ring-error-300 checked:border-error-700 dark:peer-checked:ring-error-700":
                    value === "0",
                  "peer-checked:ring-success-300 checked:border-success-700 dark:peer-checked:ring-success-700":
                    value === "1",
                  "peer-checked:ring-primary-300 checked:border-primary-700 dark:peer-checked:ring-primary-700":
                    value !== "1" && value !== "0",
                }
              )}
            >
              {labelIcon ? labelIcon : ""}
              {labelText}
            </label>
          </div>
        ))}
      </div>
    </FieldContainer>
  ) : (
    <input type="hidden" {...register} />
  );
}

// function Radio({
//   labelText,
//   labelIcon,
//   value,
//   inputProps,
//   canRender = true,
// }: IInptRadio) {
//   return canRender ? (
//     <div
//       className={clsx(
//         "flex items-center gap-2 mb-3 rounded shadow focus:outline-none",
//         "bg-primary-900 text-primary-400"
//       )}
//     >
//       <input type="radio" className="sr-only peer" {...inputProps} />
//       <label
//         className={clsx(
//           "flex items-center gap-2 p-2 rounded ",
//           "peer-checked:ring-2 peer-checked:text-primary-200",
//           {
//             "peer-checked:ring-error-300 dark:peer-checked:ring-error-700":
//               inputProps.value === "0",
//             "peer-checked:ring-success-600 dark:peer-checked:ring-success-400":
//               inputProps.value === "1",
//             "peer-checked:ring-primary-500":
//               inputProps.value !== "1" && inputProps.value !== "0",
//           }
//         )}
//         htmlFor={inputProps.id}
//       >
//         {labelIcon ? labelIcon : ""}
//         {labelText}
//       </label>
//     </div>
//   ) : (
//     <input type="hidden" {...inputProps} />
//   );
// }
