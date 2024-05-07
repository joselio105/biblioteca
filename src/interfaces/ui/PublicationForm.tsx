import { FieldInput } from "@/modules/components/FieldInput";
import { IPublication, IPublicationForm } from "@/modules/types/publication";
import { IUser } from "@/modules/types/user";
import { Form } from "@components/Form";
import { PageHeading } from "@components/PageHeading";
import { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  userLogged: IUser;
  publication?: IPublication;
  isLoading: boolean;
  success: boolean;
  feedbackMessage: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  registers: UseFormRegister<IPublicationForm>;
  errors: FieldErrors<IPublicationForm>;
}

export function PublicationForm({
  userLogged,
  publication,
  isLoading,
  success,
  feedbackMessage,
  handleSubmit,
  registers,
  errors,
}: Props) {
  return (
    <>
      <PageHeading>
        {publication ? publication.title : "Publicação"}
      </PageHeading>
      <Form
        isLoading={isLoading}
        success={success}
        feedbackMessage={feedbackMessage}
        handleSubmit={handleSubmit}
        backTo={
          publication ? "/publication/" + publication.id : "/publications"
        }
      >
        <>...</>
        {/* <FieldInput
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
        <input type="hidden" value="0" {...registers("isActive")} />
        <input type="hidden" value="0" {...registers("isAdmin")} /> */}
      </Form>
    </>
  );
}
