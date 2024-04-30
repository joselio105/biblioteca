import { FieldInput } from "@/modules/components/FieldInput";
import { FieldInputRadio } from "@/modules/components/FieldInputRadio";
import { PageColumns } from "@/modules/components/PageColumns";
import { IUser, IUserForm } from "@/modules/types/user";
import { Form } from "@components/Form";
import { PageHeading } from "@components/PageHeading";
import { Check, X } from "lucide-react";
import { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  user?: IUser;
  userLogged: IUser;
  isLoading: boolean;
  success: boolean;
  feedbackMessage: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  registers: UseFormRegister<IUserForm>;
  errors: FieldErrors<IUserForm>;
}

export function UserForm({
  user,
  userLogged,
  isLoading,
  success,
  feedbackMessage,
  handleSubmit,
  registers,
  errors,
}: Props) {
  return (
    <>
      <PageHeading>{user ? user.name : "Usuário"}</PageHeading>
      <Form
        isLoading={isLoading}
        success={success}
        feedbackMessage={feedbackMessage}
        handleSubmit={handleSubmit}
        backTo={user ? "/user/" + user.id : "/users"}
      >
        <FieldInput
          labelText="Nome"
          inputProps={{
            placeholder: "Informe o nome do usuário",
            ...registers("name"),
          }}
          errorMessage={errors.name?.message}
        />
        <FieldInput
          labelText="Email"
          inputProps={{
            placeholder: "Informe o email do usuário",
            ...registers("email"),
          }}
          errorMessage={errors.email?.message}
        />
        <FieldInput
          labelText="Telefone"
          inputProps={{
            placeholder: "Informe o telefone do usuário",
            ...registers("phone"),
          }}
          errorMessage={errors.phone?.message}
        />
        <PageColumns>
          <FieldInputRadio
            title="Usuário ativo"
            errorMessage={errors.isActive?.message}
            radios={[
              {
                labelText: "Não",
                labelIcon: <X className="text-error-600-600" size={28} />,
                inputProps: {
                  id: "isActive0",
                  value: "0",
                  ...registers("isActive"),
                },
              },
              {
                labelText: "Sim",
                labelIcon: <Check className="text-success-600" size={28} />,
                inputProps: {
                  id: "isActive1",
                  value: "1",
                  ...registers("isActive"),
                },
              },
            ]}
          />
          <FieldInputRadio
            title="Usuário Admin"
            errorMessage={errors.isAdmin?.message}
            canRender={userLogged.isAdmin}
            radios={[
              {
                labelText: "Não",
                labelIcon: <X className="text-error-600-600" size={28} />,
                inputProps: {
                  id: "isAdmin0",
                  value: "0",
                  ...registers("isAdmin"),
                },
              },
              {
                labelText: "Sim",
                labelIcon: <Check className="text-success-600" size={28} />,
                inputProps: {
                  id: "isAdmin1",
                  value: "1",
                  ...registers("isAdmin"),
                },
              },
            ]}
          />
        </PageColumns>
        <input type="hidden" value="0" {...registers("isAdmin")} />
      </Form>
    </>
  );
}
