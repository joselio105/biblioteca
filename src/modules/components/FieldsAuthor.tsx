import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { FieldInput } from "./FieldInput";
import { GridRow } from "./GridRow";
import { IPublicationForm } from "../types/publication";
import { Button } from "./Button";
import { CircleMinus, CirclePlus } from "lucide-react";

interface Props {
  registers: UseFormRegister<IPublicationForm>;
  errors: FieldErrors<IPublicationForm>;
  control: Control<IPublicationForm>;
}

export function FieldsAuthor({ registers, control, errors }: Props) {
  const { fields, append, remove } = useFieldArray<IPublicationForm>({
    control,
    name: "authors",
  });

  return (
    <>
      <GridRow>
        <Button
          className="col-start-2"
          isSecondary
          onClick={(event) => {
            event.preventDefault();
            remove();
          }}
        >
          <CircleMinus />
        </Button>
        <span className="col-span-4 flex items-center justify-center">
          {fields.length > 0
            ? `Informe o(s) ${fields.length} autor(es) como Sobrenome, Nome`
            : "Para acrescentar um autor clique no botão a direita"}
        </span>
        <Button
          isSecondary
          onClick={(event) => {
            event.preventDefault();
            append("");
          }}
        >
          <CirclePlus />
        </Button>
      </GridRow>
      {fields.map((field, key) => (
        <FieldInput
          key={field.id}
          className="col-span-7"
          labelText={"Autor " + (key + 1)}
          inputProps={{
            placeholder: "Informe o(s) autor(es) da publicação.",
            defaultValue: field.id,
            ...registers(`authors.${key}`),
          }}
          errorMessage={
            errors && errors.authors ? errors?.authors[key]?.message : undefined
          }
        />
      ))}
    </>
  );
}
