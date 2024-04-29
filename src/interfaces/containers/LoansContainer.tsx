import { useState } from "react";
import { Loans } from "../ui/Loans";
import { findManyLoans } from "@infra/api/loans";
import { ILoan } from "@/modules/types/loan";

export function LoansContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [loans, setLoans] = useState<ILoan[]>([] as ILoan[]);

  const executeQuery = (query: string) => {
    setIsLoading(true);
    setIsSubmited(true);
    findManyLoans({ query })
      .then((response) => setLoans(response))
      .finally(() => setIsLoading(false));
  };

  return (
    <Loans
      executeQuery={executeQuery}
      loans={loans}
      isLoading={isLoading}
      isSubmited={isSubmited}
    />
  );
}
