import { Search } from "@components/Search";
import { PageHeading } from "@components/PageHeading";
import { ReactNode } from "react";
import { IUser } from "@/modules/types/user";
import { Table } from "@/modules/components/Table";

interface Props {
  executeQuery: (value: string) => void;
  isLoading: boolean;
  isSubmited: boolean;
  users: IUser[];
}

export function Users({ executeQuery, isLoading, isSubmited, users }: Props) {
  return (
    <>
      <PageHeading>Usuários</PageHeading>
      <Search
        labelText="Usuário"
        placeholder="Preencha os dados a serem buscados"
        executeQuery={executeQuery}
      />
      {isSubmited ? (
        <Table
          labels={[
            {},
            { label: "Nome", colSpan: 2 },
            { label: "Email" },
            { label: "Telefone" },
          ]}
          values={users.map((user) => [
            {},
            { label: user.name, colSpan: 2 },
            { label: user.email },
            { label: user.phone },
          ])}
        />
      ) : (
        ""
      )}
    </>
  );
}

interface RowProps {
  children: ReactNode;
  className?: string;
}
function Row({ children, className = "" }: RowProps) {
  return (
    <div
      className={`grid grid-cols-5 border border-blue-800 even:bg-stone-700 ${className}`}
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
