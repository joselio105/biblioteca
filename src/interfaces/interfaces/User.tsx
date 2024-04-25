import { Button } from "@/modules/components/Button";
import { Empty } from "@/modules/components/Empty";
import { Loading } from "@/modules/components/Loading";
import { Table } from "@/modules/components/Table";
import { TextLabeled } from "@/modules/components/TextLabeled";
import { ILoan } from "@/modules/types/loan";
import { IUser } from "@/modules/types/user";
import { getDate } from "@/modules/utils/datetime";
import { PageHeading } from "@components/PageHeading";
import { ArrowLeft, Check } from "lucide-react";

interface Props {
  user: IUser;
  loans: ILoan[];
  isLoading: boolean;
}

export function User({ user, loans, isLoading }: Props) {
  return (
    <>
      <PageHeading>{user.name}</PageHeading>
      <div className="flex items-center justify-between">
        <TextLabeled label="Email">{user.email}</TextLabeled>
        <TextLabeled label="Telefone">{user.phone}</TextLabeled>
      </div>
      {isLoading ? (
        <Loading />
      ) : loans.length === 0 ? (
        <Empty text={`Nenhum empréstimo registrado para ${user.name}`} />
      ) : (
        <Table
          labels={[
            {},
            { label: "Publicação", colSpan: 2 },
            { label: "Data de empréstimo" },
            { label: "Data para devolução" },
          ]}
          values={loans.map((loan) => {
            return [
              {
                label: loan.returnedAt ? (
                  <div className="flex items-center gap-2">
                    <Check size={28} className="text-green-600" />
                    Devolvido em {getDate(loan.returnedAt)}
                  </div>
                ) : (
                  <Button to={`/loanForm/${loan.id}`}>Devolver</Button>
                ),
              },
              {
                colSpan: 2,
                label:
                  loan.copy && loan.copy.publication ? (
                    <div className="flex gap-2 items-center">
                      <span>{loan.copy.publication.title}</span>
                      <span className="text-sm text-stone-400">
                        {loan.copy.publication.themeCode}
                      </span>
                      <span className="text-sm text-stone-400">
                        {loan.copy.publication.authorCode}
                      </span>
                    </div>
                  ) : (
                    "...."
                  ),
              },
              {
                label: loan.user ? getDate(loan.loan) : "---",
              },
              {
                label: loan.user ? getDate(loan.return) : "---",
              },
            ];
          })}
        />
      )}
      <footer className="flex items-center justify-end mt-4">
        <Button to="/users">
          <ArrowLeft size={28} />
          Voltar
        </Button>
      </footer>
    </>
  );
}
