import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loan } from "../interfaces/Loan";
import { findLoanById } from "@infra/api/loans";
import { ILoan } from "@/modules/types/loan";

export function LoanContainer() {
  const { id } = useParams();
  const [loanObject, setLoanObject] = useState<ILoan>({} as ILoan);

  const fetchLoan = (id: string) => {
    findLoanById(id)
      .then((response) => {
        console.log(response);
        setLoanObject(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(id);
    fetchLoan(id ?? "");
  }, [id]);

  return <Loan loanObject={loanObject} />;
}
