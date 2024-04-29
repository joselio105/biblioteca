import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { UserForm } from "../ui/UserForm";
import { findUserById, insertUser, updateUser } from "@infra/api/user";
import { userResolver as resolver } from "@infra/schemas/user";
import { IUser, IUserForm } from "@/modules/types/user";
import { IData } from "@/modules/types/data";

export function UserFormContainer() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const values = id
    ? {
        name: user.name,
        email: user.email ?? "",
        phone: user.phone ?? "",
        isActive: user.isActive ? "1" : "0",
        isAdmin: user.isAdmin ? "1" : "0",
      }
    : undefined;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver, values });

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
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

    setIsLoading(true);
    updateUser(data)
      .then(() => {
        setSuccess(true);
        setFeedbackMessage("Usuário alterado com sucesso");
      })
      .finally(() => setIsLoading(false));
  };

  const handlerSubmit = (value: IUserForm) => {
    id ? update(id, value) : insert(value);
  };

  const fetchUser = (id: string) => {
    findUserById(id).then((response) => setUser(response));
  };

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  return (
    <UserForm
      user={user}
      isLoading={isLoading}
      success={success}
      feedbackMessage={feedbackMessage}
      handleSubmit={handleSubmit(handlerSubmit)}
      registers={register}
      errors={errors}
    />
  );
}
