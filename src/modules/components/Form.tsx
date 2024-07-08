import { FormEvent, ReactNode } from "react";
import clsx from "clsx";
import { ArrowLeft, CheckCircle, Send, XCircle } from "lucide-react";
import { Button } from "./Button";

export interface Props {
  success?: boolean;
  isLoading: boolean;
  backTo?: string;
  backButtonText?: string;
  sendButtonText?: string;
  backIcon?: ReactNode;
  submitIcon?: ReactNode;
  feedbackMessage: string;
  children: ReactNode;
  handleSubmit: (data: FormEvent<HTMLFormElement>) => void;
}

export function Form({
  feedbackMessage,
  success = false,
  isLoading,
  backTo,
  backButtonText = "Voltar",
  sendButtonText = "Enviar",
  backIcon = <ArrowLeft size={24} />,
  submitIcon = <Send size={24} />,
  children,
  handleSubmit,
}: Props) {
  return (
    <form
      className="relative w-full flex flex-col gap-5 rounded"
      onSubmit={handleSubmit}
    >
      {feedbackMessage.length > 0 ? (
        <div
          className={clsx(
            "rounded-lg shadow shadow-primary-600 flex items-center justify-center gap-3 p-5 mx-9 mb-5",
            {
              "bg-error-900 text-error-200": !success,
              "bg-success-900 text-secondary-200": success,
            }
          )}
        >
          {success ? <CheckCircle size={48} /> : <XCircle size={48} />}
          {feedbackMessage}
        </div>
      ) : (
        ""
      )}
      {children}
      <footer
        className={clsx(
          "w-full flex gap-5 items-center py-5 mt-1 sm:flex-row ",
          {
            "sm:justify-between": backTo,
            "sm: justify-end": !backTo,
          }
        )}
      >
        {backTo ? (
          <Button isSecondary to={backTo}>
            {backIcon}
            {backButtonText}
          </Button>
        ) : (
          ""
        )}
        <Button type="submit" isLoading={isLoading}>
          {submitIcon}
          {sendButtonText}
        </Button>
      </footer>
    </form>
  );
}
