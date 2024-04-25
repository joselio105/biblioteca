import { Empty } from "@components/Empty";
import { Table } from "@components/Table";
import { Search } from "@components/Search";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { PageHeading } from "@components/PageHeading";
import { getDate } from "@utils/datetime";
import { ILoan } from "@/modules/types/loan";

interface Props {
  executeQuery: (value: string) => void;
  isLoading: boolean;
  isSubmited: boolean;
  loans: ILoan[];
}

export function Loans({ executeQuery, isLoading, isSubmited, loans }: Props) {
  return (
    <>
      <PageHeading>Empréstimos</PageHeading>
      <Search
        placeholder="Preencha os dados dos empréstimos a serem buscados"
        labelText="Empréstimo"
        executeQuery={executeQuery}
      />
      {isSubmited ? (
        isLoading ? (
          <Loading />
        ) : loans.length > 0 ? (
          <Table
            labels={[
              {},
              { label: "Título", colSpan: 2 },
              { label: "Emprestado para" },
              { label: "Emprestado em" },
              { label: "A ser devolvido em" },
            ]}
            values={loans.map(({ id, user, copy, loan, ...props }) => [
              {
                label: <Button to={`/loan/${id}`}>Detalhes</Button>,
              },
              {
                label:
                  copy && copy.publication ? copy?.publication.title : "???",
                colSpan: 2,
              },
              { label: user?.name ?? "" },
              { label: getDate(loan) },
              { label: getDate(props.return) },
            ])}
          />
        ) : (
          <Empty text="Nenhum empréstimo encontrado" />
        )
      ) : (
        ""
      )}
    </>
  );
}
