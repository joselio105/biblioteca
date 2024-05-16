import { useEffect, useState } from "react";
import { Loans } from "../ui/Loans";
import { findManyLoans } from "@infra/api/loans";
import { ILoan } from "@/modules/types/loan";
import { findManyUsers, findUserById } from "@/modules/infra/api/user";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "@/modules/types/user";
import { useAuth } from "@/modules/hooks/useAuth";
import {
  findCopyById,
  findCopyByRegistrationCode,
} from "@/modules/infra/api/copy";
import { ICopy } from "@/modules/types/copy";
import { copyStorage } from "@/modules/utils/copyStorage";

export function LoansContainer() {
  const { userId } = useParams();
  const {
    authentication: { user: userLogged },
  } = useAuth();
  const copyStored: ICopy[] = copyStorage.read() ?? ([] as ICopy[]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState<IUser>({} as IUser);
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  const [copies, setCopies] = useState<ICopy[]>(copyStored);
  const [loans, setLoans] = useState<ILoan[]>([] as ILoan[]);

  const executeQuery = (query: string) => {
    setIsLoading(true);
    setIsSubmited(true);
    findManyUsers({ query })
      .then((response) => {
        if (response.length === 1) {
          setUser(response[0]);
          navigate(`/loans/${response[0].id}`);
        }
        setUsers(response);
      })
      .finally(() => setIsLoading(false));
  };

  const executeQueryCopy = (registrationCode: string) => {
    if (registrationCode.match(/bib\.\d{4}\.\d+/)) {
      findCopyByRegistrationCode(registrationCode).then((response) => {
        if (response) {
          copyStorage.append(response);
          setCopies([response, ...copies]);
        } else {
          setFeedback(
            "O tombo patrimanial não corresponse a nenhuma publicação"
          );
        }
      });
    } else {
      setFeedback("O tombo está fora do padrão bib.[ano].[número]");
    }
  };

  const fetchUser = (id: string) => {
    findUserById(id).then((response) => {
      setUser(response);
    });
  };

  const fetchLoans = () => {
    findManyLoans({ returnedAt: -1 }).then((response) => setLoans(response));
  };

  const cancelCopy = (id: string) => {
    const copiesCleanned = copies.filter((copy) => copy.id !== id);
    setCopies(copiesCleanned);
    copyStorage.save(copies);
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    } else {
      copyStorage.clean();
    }
    fetchLoans();
  }, [userId]);

  return (
    <Loans
      executeQuery={executeQuery}
      executeQueryCopy={executeQueryCopy}
      cancelCopy={cancelCopy}
      feedback={feedback}
      loans={loans}
      copies={copies}
      user={user}
      users={users}
      isLoading={isLoading}
      isSubmited={isSubmited}
    />
  );
}
