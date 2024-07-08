import { FormEventHandler } from "react";
import { Form } from "./Form";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ICredentials } from "../types/auth";
import { FieldInput } from "./FieldInput";

interface Props {
  isLoading: boolean;
  success: boolean;
  feedbackMessage: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  registers: UseFormRegister<ICredentials>;
  errors: FieldErrors<ICredentials>;
}

export function FormLogin({
  isLoading,
  success,
  feedbackMessage,
  handleSubmit,
  registers,
  errors,
}: Props) {
  return (
    <Form
      feedbackMessage={feedbackMessage}
      success={success}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <FieldInput
        labelText="Email"
        inputProps={{
          placeholder: "Preencha o email do usuário",
          type: "email",
          ...registers("email"),
        }}
        errorMessage={errors.email?.message}
      />
      <FieldInput
        labelText="Senha"
        inputProps={{
          placeholder: "Preencha a senha do usuário",
          type: "password",
          ...registers("password"),
        }}
        errorMessage={errors.password?.message}
      />
    </Form>
  );
}
