import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { FieldInput } from "./FieldInput";
import { GridRow } from "./GridRow";
import { IPublicationForm } from "../types/publication";
import { Button } from "./Button";
import { CirclePlus } from "lucide-react";

interface Props {
  registers: UseFormRegister<IPublicationForm>;
  errors: FieldErrors<IPublicationForm>;
  control: Control<IPublicationForm>;
}

export function FieldsAuthor({ registers, control, errors }: Props) {
  const { fields, append } = useFieldArray<IPublicationForm>({
    control,
    name: "authors",
  });

  return fields.map((field, key) => (
    <GridRow key={field.id}>
      <FieldInput
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
  ));
}
