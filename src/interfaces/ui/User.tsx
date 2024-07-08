import { Check } from "lucide-react";
import { Empty } from "@components/Empty";
import { Table } from "@components/Table";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { PageNav } from "@components/PageNav";
import { PageFooter } from "@components/PageFooter";
import { PageHeading } from "@components/PageHeading";
import { PageColumns } from "@components/PageColumns";
import { TextLabeled } from "@components/TextLabeled";
import { getDate } from "@utils/datetime";
import { ILoan } from "@/modules/types/loan";
import { IUser } from "@/modules/types/user";

interface Props {
  user: IUser;
  loans: ILoan[];
  isLoading: boolean;
  returnLoan: (loanId: string) => void;
}

export function User({ user, loans, isLoading, returnLoan }: Props) {
  return (
    <>
      <PageHeading>{user.name}</PageHeading>
      <PageNav>
        <Button isSecondary to={`/userForm/${user.id}`}>
          Editar
        </Button>
      </PageNav>

      <PageColumns>
        <TextLabeled label="Email">{user.email}</TextLabeled>
        <TextLabeled label="Telefone">{user.phone}</TextLabeled>
      </PageColumns>

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
                    <Check size={28} className="text-success-600" />
                    Devolvido em {getDate(loan.returnedAt)}
                  </div>
                ) : (
                  <Button onClick={() => returnLoan(loan.id)}>Devolver</Button>
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
                      <span className="text-sm text-stone-400">
                        {loan.copy.registrationCode}
                      </span>
                    </div>
                  ) : (
                    "...."
                  ),
              },
              {
                label: getDate(loan.loan),
              },
              {
                label: getDate(loan.returnAt),
              },
            ];
          })}
        />
      )}
      <PageFooter backTo="/users" />
    </>
  );
}
