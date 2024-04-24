import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../interfaces/User";
import { findUserById } from "@infra/api/user";
import { IUser } from "@/modules/types/user";
import { ILoan } from "@/modules/types/loan";
import { findManyLoansByUserId } from "@/modules/infra/api/loans";

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

  useEffect(() => {
    fetchUser(id ?? "");
    fetchLoans(id ?? "");
  }, [id]);
  return <User user={user} isLoading={isLoading} loans={loans} />;
}
