import { useEffect, useState } from "react";
import { Loans } from "../ui/Loans";
import { findManyLoans, insertLoan } from "@infra/api/loans";
import { ILoan, ILoanForm } from "@/modules/types/loan";
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
import { useForm } from "react-hook-form";
import { ICredentials } from "@/modules/types/auth";
import { User } from "../ui/User";
import { authResolver as resolver } from "@infra/schemas/auth";
import { checkCredentials } from "@/modules/infra/api/auth";
import { getTimestampPusDays, now } from "@/modules/utils/datetime";

// TODO: Listar empréstimos não devolvidos do usuário ou todos

export function LoansContainer() {
  const { userId } = useParams();
  const {
    authentication: { user: userLogged },
  } = useAuth();
  const copyStored: ICopy[] = copyStorage.read() ?? ([] as ICopy[]);
  const navigate = useNavigate();
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [feedbackAuth, setFeedbackAuth] = useState("");
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState<IUser>({} as IUser);
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  const [copies, setCopies] = useState<ICopy[]>(copyStored);
  const [loans, setLoans] = useState<ILoan[]>([] as ILoan[]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICredentials>({
    resolver,
    values: { email: user.email ?? "", password: "" },
  });

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
          setFeedback("");
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

  const handlerSubmit = (value: ICredentials) => {
    checkCredentials(value).then((response) => {
      if (response) {
        copies.forEach(async (copy) => {
          const loan: ILoanForm = {
            userId: user.id,
            copyId: copy.id,
            copy,
            loan: now(),
            returnAt: getTimestampPusDays(28),
          };

          await insertLoan(loan);
        });
        copyStorage.clean();
        navigate("/user/" + user.id);
      } else {
        setIsSuccess(false);
        setFeedbackAuth("Credenciais inválidas");
      }
    });
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
      isLoadingAuth={isLoadingAuth}
      feedbackAuth={feedbackAuth}
      success={isSuccess}
      handleSubmit={handleSubmit(handlerSubmit)}
      registers={register}
      errors={errors}
    />
  );
}
