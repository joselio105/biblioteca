import { PageFooter } from "@components/PageFooter";
import { PageHeading } from "@components/PageHeading";
import { TextLabeled } from "@components/TextLabeled";
import { PageColumns } from "@components/PageColumns";
import { IPublication } from "@/modules/types/publication";
import { Table } from "@/modules/components/Table";
import { ICopy } from "@/modules/types/copy";
import { Loading } from "@/modules/components/Loading";

interface Props {
  publication: IPublication;
  copys: ICopy[];
  isLoading: boolean;
}

export function Publication({ publication, copys, isLoading }: Props) {
  return (
    <>
      <PageHeading>{publication.title}</PageHeading>
      <PageColumns>
        <TextLabeled label="Autor">{publication.author}</TextLabeled>
        <TextLabeled label="Código  Cutter">
          {publication.authorCode}
        </TextLabeled>
      </PageColumns>
      <PageHeading type="h3">Exemplares</PageHeading>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          labels={[{}, { label: "Tombo Patrimonial" }]}
          values={copys.map((copy) => [{}, { label: copy.registrationCode }])}
        />
      )}
      <PageFooter backTo="/publications" />
    </>
  );
}
