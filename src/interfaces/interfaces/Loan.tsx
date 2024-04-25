import { PageFooter } from "@components/PageFooter";
import { PageHeading } from "@components/PageHeading";
import { TextLabeled } from "@components/TextLabeled";
import { PageColumns } from "@components/PageColumns";
import { getDate } from "@utils/datetime";
import { ILoan } from "@/modules/types/loan";

interface Props {
  loanObject: ILoan;
}

export function Loan({ loanObject }: Props) {
  console.log(loanObject);

  return (
    <>
      <PageHeading>Empréstimo</PageHeading>
      <PageColumns>
        <TextLabeled label="Título">
          {loanObject?.copy?.publication?.title}
        </TextLabeled>
        <TextLabeled label="Autor">
          {loanObject?.copy?.publication?.author}
        </TextLabeled>
      </PageColumns>

      <PageColumns columns={3}>
        <TextLabeled label="Emprestado em">
          {getDate(loanObject.loan)}
        </TextLabeled>
        <TextLabeled label="Deve ser devolvido em">
          {getDate(loanObject.return)}
        </TextLabeled>
        <TextLabeled label="Foi devolvido em">
          {getDate(loanObject.returnedAt)}
        </TextLabeled>
      </PageColumns>

      <PageColumns>
        <TextLabeled label="Retirado por">{loanObject?.user?.name}</TextLabeled>
      </PageColumns>

      <PageColumns columns={3}>
        <TextLabeled label="Código Cutter">
          {loanObject?.copy?.publication?.authorCode}
        </TextLabeled>
        <TextLabeled label="CDD">
          {loanObject?.copy?.publication?.themeCode}
        </TextLabeled>
        <TextLabeled label="Tombo Patrimonial">
          {loanObject?.copy?.registrationCode}
        </TextLabeled>
      </PageColumns>
      <PageFooter backTo="/loans" />
    </>
  );
}
