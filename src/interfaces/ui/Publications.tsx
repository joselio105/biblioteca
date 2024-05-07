import { Empty } from "@components/Empty";
import { Table } from "@components/Table";
import { Search } from "@components/Search";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { PageHeading } from "@components/PageHeading";
import { IPublication } from "@/modules/types/publication";
import { PageNav } from "@/modules/components/PageNav";

interface Props {
  executeQuery: (value: string) => void;
  isLoading: boolean;
  isSubmited: boolean;
  publications: IPublication[];
}

export function Publications({
  executeQuery,
  isSubmited,
  isLoading,
  publications,
}: Props) {
  return (
    <>
      <PageHeading>Publicações</PageHeading>
      <PageNav>
        <Button isSecondary to="/publicationForm">
          Adicionar
        </Button>
      </PageNav>
      <Search
        labelText="Publicação"
        placeholder="Preencha os dados das publicações a serem buscadas"
        executeQuery={executeQuery}
      />
      {isSubmited ? (
        isLoading ? (
          <Loading />
        ) : publications.length > 0 ? (
          <Table
            labels={[
              {},
              { label: "Título", colSpan: 2 },
              { label: "Autor" },
              { label: "Cutter" },
              { label: "CDD" },
            ]}
            values={publications.map((publication) => [
              {
                label: (
                  <Button to={`/publication/${publication.id}`}>
                    Detalhes
                  </Button>
                ),
              },
              { label: publication.title, colSpan: 2 },
              { label: publication.authors[0] ?? "" },
              { label: publication.authorCode },
              { label: publication.themeCode },
            ])}
          />
        ) : (
          <Empty text="Nenhuma publicação encontrada" />
        )
      ) : (
        ""
      )}
    </>
  );
}
