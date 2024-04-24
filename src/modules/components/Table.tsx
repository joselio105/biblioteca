import { ReactNode } from "react";

interface Props {
  labels: { label?: string; colSpan?: number }[];
  values: { label?: ReactNode; colSpan?: number }[][];
}

export function Table({ labels, values }: Props) {
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <div className="min-w-full w-max">
        <Row className="bg-blue-900 text-stone-200 font-bold">
          {labels.map((value) => (
            <Cell colSpan={value.colSpan}>{value.label}</Cell>
          ))}
        </Row>
        {values.map((valueRow) => (
          <Row>
            {valueRow.map((value) => (
              <Cell colSpan={value.colSpan}>{value.label}</Cell>
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
}
function Row({ children, className = "" }: RowProps) {
  return (
    <div
      className={`w-full grid grid-cols-5 border border-blue-800 even:bg-stone-700 ${className}`}
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
  return (
    <span className={`col-span-${colSpan} border-r border-r-blue-800 p-2`}>
      {children}
    </span>
  );
}
