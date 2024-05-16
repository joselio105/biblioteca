import { Empty } from "@components/Empty";
import { Table } from "@components/Table";
import { Search } from "@components/Search";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { PageHeading } from "@components/PageHeading";
import { getDate } from "@utils/datetime";
import { ILoan } from "@/modules/types/loan";
import { IUser } from "@/modules/types/user";
import { TextLabeled } from "@/modules/components/TextLabeled";
import { ICopy } from "@/modules/types/copy";
import { X } from "lucide-react";

interface Props {
  executeQuery: (value: string) => void;
  executeQueryCopy: (value: string) => void;
  cancelCopy: (value: string) => void;
  isLoading: boolean;
  isSubmited: boolean;
  copies: ICopy[];
  loans: ILoan[];
  user?: IUser;
  users?: IUser[];
  feedback: string;
}

export function Loans({
  executeQuery,
  executeQueryCopy,
  cancelCopy,
  isLoading,
  isSubmited,
  loans,
  copies,
  user,
  users,
  feedback,
}: Props) {
  console.log(user);

  return (
    <>
      <PageHeading>Empréstimos</PageHeading>
      {user?.id ? (
        <>
          <TextLabeled label="Usuário">{user.name}</TextLabeled>
          <Search
            placeholder="Digite o tombo patrimonial da cópia a ser emprestada"
            labelText="Tombo patrimonial"
            executeQuery={executeQueryCopy}
            feedback={feedback}
          />
          {copies.length > 0 ? (
            <Table
              labels={[
                { label: "" },
                { label: "Título", colSpan: 2 },
                { label: "Etiqueta" },
              ]}
              values={copies.map((copy) => [
                {
                  label: (
                    <Button onClick={() => cancelCopy(copy.id)}>
                      <X /> Cancelar
                    </Button>
                  ),
                },
                { colSpan: 2, label: copy.publication?.title },
                { label: copy.registrationCode },
              ])}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <Search
            placeholder="Busque o usuário que pegará o material emprestado"
            labelText="Usuário"
            executeQuery={executeQuery}
          />
          {users && users.length > 0 ? (
            <Table
              labels={[
                {},
                { label: "Nome", colSpan: 2 },
                { label: "Email" },
                { label: "Telefone" },
              ]}
              values={users.map((user) => [
                {
                  label: <Button to={`/user/${user.id}`}>Detalhes</Button>,
                },
                { label: user.name, colSpan: 2 },
                { label: user.email },
                { label: user.phone },
              ])}
            />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}

// <Table
//   labels={[
//     {},
//     { label: "Título", colSpan: 2 },
//     { label: "Emprestado para" },
//     { label: "Emprestado em" },
//     { label: "A ser devolvido em" },
//   ]}
//   values={loans.map(({ id, user, copy, loan, ...props }) => [
//     {
//       label: <Button to={`/loan/${id}`}>Detalhes</Button>,
//     },
//     {
//       label:
//         copy && copy.publication ? copy?.publication.title : "???",
//       colSpan: 2,
//     },
//     { label: user?.name ?? "" },
//     { label: getDate(loan) },
//     { label: getDate(props.return) },
//   ])}
// />
