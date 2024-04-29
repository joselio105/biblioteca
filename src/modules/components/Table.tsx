import { ReactNode } from "react";

interface Props {
  labels: { label?: string; colSpan?: number }[];
  values: { label?: ReactNode; colSpan?: number }[][];
}

export function Table({ labels, values }: Props) {
  const colspans = labels.reduce(
    (a, b) => a + (b.colSpan ? b.colSpan - 1 : 0),
    0
  );
  const cols = labels.length + colspans;

  return (
    <div className="min-w-full max-w-full overflow-x-auto border border-primary-300 dark:border-primary-700 rounded-lg">
      <table className="min-w-full w-max">
        <thead className="w-full">
          <tr className="w-full bg-secondary-900 text-primary-200 font-bold">
            {labels.map((label, cellKey) => (
              <th
                key={cellKey}
                colSpan={label.colSpan}
                className={`min-w-[${
                  (100 * (label.colSpan ?? 1)) / cols + "%"
                }] border-r border-r-primary-100 dark:border-r-primary-900  py-4 px-3`}
              >
                {label.label ?? ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, rowKey) => (
            <tr
              className="even:bg-primary-300 dark:even:bg-primary-700"
              key={rowKey}
            >
              {row.map((value, cellKey) => (
                <td
                  key={cellKey}
                  colSpan={value.colSpan}
                  className="border-r border-r-secondary-100 dark:border-r-secondary-900 py-4 px-3"
                >
                  {value.label ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
