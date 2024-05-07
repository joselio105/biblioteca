import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { UserForm } from "../ui/UserForm";
import { findUserById, insertUser, updateUser } from "@infra/api/user";
import { userResolver as resolver } from "@infra/schemas/user";
import { useAuth } from "@hooks/useAuth";
import { IData } from "@/modules/types/data";
import { IUser, IUserForm } from "@/modules/types/user";

export function UserFormContainer() {
  const { id } = useParams();
  const {
    authentication: { user: userLogged },
  } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | undefined>({} as IUser);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const values = id
    ? {
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        isActive: user?.isActive === true ? "1" : "0",
        isAdmin: user?.isAdmin === true ? "1" : "0",
      }
    : undefined;
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<IUserForm>({ resolver, values });

  const insert = (user: IUserForm) => {
    const data: IData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

    setIsLoading(true);
    insertUser(data)
      .then(() => {
        setFeedbackMessage("Usuário cadastrado com sucesso");
        setSuccess(true);
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setFeedbackMessage("Falha ao cadastar usuário");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const update = (id: string, user: IUserForm) => {
    const data: IData = {
      id: id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive === "1",
      isAdmin: user.isAdmin === "1",
    };

    setIsLoading(true);
    updateUser(data)
      .then(() => {
        setSuccess(true);
        setFeedbackMessage("Usuário alterado com sucesso");
        navigate("/user/" + id);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setFeedbackMessage("Falha ao alterar usuário");
      })
      .finally(() => setIsLoading(false));
  };

  const handlerSubmit = (value: IUserForm) => {
    id ? update(id, value) : insert(value);
  };

  const fetchUser = (id: string) => {
    findUserById(id).then(({ id, name, email, phone, isActive, isAdmin }) =>
      setUser({ id, name, email, phone, isActive, isAdmin })
    );
  };

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id, isLoading]);

  return (
    <UserForm
      user={user}
      userLogged={userLogged}
      isLoading={isLoading}
      success={success}
      feedbackMessage={feedbackMessage}
      handleSubmit={handleSubmit(handlerSubmit)}
      registers={register}
      setValue={setValue}
      watch={watch}
      control={control}
      errors={errors}
    />
  );
}
