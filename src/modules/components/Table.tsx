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
    <div className="w-full max-w-full overflow-x-auto">
      <div className="min-w-full w-max">
        <Row cols={cols} className="bg-blue-900 text-stone-200 font-bold">
          {labels.map((value, cellKey) => (
            <Cell key={cellKey} colSpan={value.colSpan}>
              {value.label}
            </Cell>
          ))}
        </Row>
        {values.map((valueRow, key) => (
          <Row key={key} cols={cols}>
            {valueRow.map((value, cellKey) => (
              <Cell key={cellKey} colSpan={value.colSpan}>
                {value.label}
              </Cell>
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}

interface RowProps {
  children: ReactNode;
  className?: string;
  cols: number;
}
function Row({ children, className = "", cols }: RowProps) {
  const gridCols = `grid-cols-${cols}`;

  return (
    <div
      className={`w-full grid ${gridCols} border-0 border-blue-800 even:bg-stone-700 ${className}`}
    >
      {children}
    </div>
  );
}

interface CellProps {
  children?: ReactNode;
  colSpan?: number;
}
function Cell({ children, colSpan = 1 }: CellProps) {
  const span = `col-span-${colSpan}`;

  return (
    <span
      className={`${span} border-r border-r-blue-800 p-2 flex items-center`}
    >
      {children}
    </span>
  );
}
