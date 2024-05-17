import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../ui/User";
import { findUserById } from "@infra/api/user";
import { IUser } from "@/modules/types/user";
import { ILoan } from "@/modules/types/loan";
import { findManyLoansByUserId, updateLoan } from "@/modules/infra/api/loans";
import { now } from "@/modules/utils/datetime";

export function UserContainer() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loans, setLoans] = useState<ILoan[]>([] as ILoan[]);

  const fetchUser = (id: string) => {
    findUserById(id).then((response) => setUser(response));
  };

  const fetchLoans = (userId: string) => {
    setIsLoading(true);
    findManyLoansByUserId(userId)
      .then((response) => {
        setLoans(response);
      })
      .finally(() => setIsLoading(false));
  };

  const returnLoan = (loanId: string) => {
    const loan = loans.find((loan) => loan.id === loanId);
    if (loan && id) {
      loan.returnedAt = now();
      updateLoan(loanId, loan).then(() => {
        fetchLoans(id);
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser(id);
      fetchLoans(id);
    }
  }, [id]);
  return (
    <User
      user={user}
      isLoading={isLoading}
      loans={loans}
      returnLoan={returnLoan}
    />
  );
}
