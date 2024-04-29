import { Empty } from "@components/Empty";
import { Table } from "@components/Table";
import { Search } from "@components/Search";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { PageHeading } from "@components/PageHeading";
import { IUser } from "@/modules/types/user";

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
        placeholder="Preencha os dados do usuário a serem buscados"
        executeQuery={executeQuery}
      />
      {isSubmited ? (
        isLoading ? (
          <Loading />
        ) : users.length === 0 ? (
          <Empty text="Nenum usuário encontrado" />
        ) : (
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
        )
      ) : (
        ""
      )}
    </>
  );
}
