import { FormEventHandler } from "react";
import { Check, X } from "lucide-react";
import { Form } from "@components/Form";
import { FieldInput } from "@components/FieldInput";
import { PageHeading } from "@components/PageHeading";
import { PageColumns } from "@components/PageColumns";
import { FieldInputRadio } from "@components/FieldInputRadio";
import { IUser, IUserForm } from "@/modules/types/user";
import { TSetValue } from "@/modules/types/fieldInputRadio";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface Props {
  user?: IUser;
  userLogged: IUser;
  isLoading: boolean;
  success: boolean;
  feedbackMessage: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  registers: UseFormRegister<IUserForm>;
  setValue: UseFormSetValue<IUserForm>;
  watch: UseFormWatch<IUserForm>;
  control: Control<IUserForm>;
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
  watch,
  setValue,
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
        backTo={user?.id ? "/user/" + user.id : "/users"}
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
            defaultValue={watch("isActive")}
            register={registers("isActive")}
            setValue={setValue}
            radios={[
              {
                labelText: "Não",
                labelIcon: <X className="text-error-600" size={28} />,
                value: "0",
              },
              {
                labelText: "Sim",
                labelIcon: <Check className="text-success-600" size={28} />,
                value: "1",
              },
            ]}
          />
          <FieldInputRadio
            canRender={userLogged.isAdmin}
            title="Usuário administrador"
            errorMessage={errors.isAdmin?.message}
            defaultValue={watch("isAdmin")}
            register={registers("isAdmin")}
            setValue={setValue as TSetValue}
            radios={[
              {
                labelText: "Não",
                labelIcon: <X className="text-error-600" size={28} />,
                value: "0",
              },
              {
                labelText: "Sim",
                labelIcon: <Check className="text-success-600" size={28} />,
                value: "1",
              },
            ]}
          />
        </PageColumns>
        <input type="hidden" value="0" {...registers("isAdmin")} />
      </Form>
    </>
  );
}
