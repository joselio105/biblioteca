import { languages } from "@/data/languages";
import { themes } from "@/data/themes";
import { Button } from "@/modules/components/Button";
import { FieldInput } from "@/modules/components/FieldInput";
import { FieldSelect } from "@/modules/components/FieldSelect";
import { Fieldset } from "@/modules/components/Fieldset";
import { GridRow } from "@/modules/components/GridRow";
import { IPublication, IPublicationForm } from "@/modules/types/publication";
import { IUser } from "@/modules/types/user";
import { now } from "@/modules/utils/datetime";
import { Form } from "@components/Form";
import { PageHeading } from "@components/PageHeading";
import { PlusCircle, Search } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface Props {
  userLogged: IUser;
  publication?: IPublication;
  isLoading: boolean;
  success: boolean;
  feedbackMessage: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  registers: UseFormRegister<IPublicationForm>;
  watch: UseFormWatch<IPublicationForm>;
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
  watch,
  errors,
}: Props) {
  const [authorsCount, setAuthorsCount] = useState(1);

  const AuthorFields = () => {
    if (publication && publication.authors) {
      publication.authors.map((author, key) => (
        <GridRow key={key}>
          <FieldInput
            className="col-span-7"
            labelText="Autor"
            inputProps={{
              placeholder: "Informe o autor da publicação",
              value: author,
              id: registers("authors").name + key,
              ...registers("authors"),
            }}
            errorMessage={errors?.authors?.message}
          />
          <Button
            isSecondary
            onClick={(event) => {
              event.preventDefault();
              setAuthorsCount(key + 1);
            }}
          >
            <PlusCircle />
          </Button>
        </GridRow>
      ));
    } else {
      return (
        <GridRow>
          <FieldInput
            className="col-span-7"
            labelText="Autor"
            inputProps={{
              placeholder: "Informe o autor da publicação",
              id: registers("authors").name + authorsCount,
              ...registers("authors"),
            }}
            errorMessage={errors?.authors?.message}
          />
          <Button
            isSecondary
            onClick={(event) => {
              event.preventDefault();
              setAuthorsCount(authorsCount + 1);
            }}
          >
            <PlusCircle />
          </Button>
        </GridRow>
      );
    }
  };

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
        <input
          type="hidden"
          value={publication?.id ? publication.createdAt : now()}
          {...registers("createdAt")}
        />
        <input type="hidden" value={now()} {...registers("updatedAt")} />
        <input
          type="hidden"
          value={publication?.id ? publication.createdBy : userLogged.id}
          {...registers("createdBy")}
        />
        <input
          type="hidden"
          value={userLogged.id}
          {...registers("updatedBy")}
        />
        <GridRow>
          <FieldInput
            labelText="ISBN"
            className="col-span-7"
            inputProps={{
              placeholder:
                "Informe o ISBN e pesquise outros dados sobre a publicação",
              ...registers("isbn"),
            }}
            errorMessage={errors.isbn?.message}
          />
          <Button isSecondary to={`/publicationForm/NOT/${watch("isbn")}`}>
            <Search />
          </Button>
        </GridRow>
        <FieldSelect
          labelText="Assunto da publicação"
          placeholder="Escolha o assunto da publicação"
          optionValues={themes.map(({ name, code }) => ({
            label: `${name} (${code})`,
            value: String(code),
          }))}
          selectProps={{
            ...registers("themeCode"),
          }}
          errorMessage={errors.themeCode?.message}
        />
        <Fieldset legendText="Título">
          <FieldInput
            labelText="Título"
            inputProps={{
              placeholder: "Informe o título da publicação",
              ...registers("title"),
            }}
            errorMessage={errors.title?.message}
          />
          <FieldInput
            labelText="Subtítulo"
            inputProps={{
              placeholder: "Informe o subtítulo da publicação",
              ...registers("subTitle"),
            }}
            errorMessage={errors.subTitle?.message}
          />
          <FieldInput
            labelText="Título original"
            inputProps={{
              placeholder: "Informe o título original da publicação",
              ...registers("originalTitle"),
            }}
            errorMessage={errors.originalTitle?.message}
          />
          <FieldSelect
            labelText="Idioma original"
            optionValues={languages.map(({ name: label, code: value }) => ({
              label,
              value,
            }))}
            selectProps={{ ...registers("originalLanguage") }}
            errorMessage={errors.originalLanguage?.message}
          />
        </Fieldset>

        <Fieldset legendText="Autor">
          <FieldInput
            labelText="Tradutor"
            inputProps={{
              placeholder: "Informe o tradutor da publicação, caso houver",
              ...registers("translator"),
            }}
            errorMessage={errors.translator?.message}
          />
          <FieldInput
            labelText="Código Cutter"
            inputProps={{
              placeholder:
                "Preencha o código do autor ou deixe em branco para o sistema preencher",
              ...registers("authorCode"),
            }}
            errorMessage={errors.authorCode?.message}
          />
          <AuthorFields />
        </Fieldset>
        <Fieldset legendText="Publicação">
          <FieldInput
            labelText="Editora"
            inputProps={{
              placeholder: "Informe a editora da publicação",
              ...registers("publisher"),
            }}
            errorMessage={errors.publisher?.message}
          />
          <FieldInput
            labelText="Data de publicação"
            inputProps={{
              placeholder: "Informe a data de publicação",
              ...registers("pubDate"),
            }}
            errorMessage={errors.pubDate?.message}
          />
          <FieldInput
            labelText="Data original de publicação"
            inputProps={{
              placeholder: "Informe a data original de publicação",
              ...registers("pubOriginalDate"),
            }}
            errorMessage={errors.pubOriginalDate?.message}
          />
          <FieldInput
            labelText="Local de publicação"
            inputProps={{
              placeholder: "Informe o local de publicação",
              ...registers("pubPlace"),
            }}
            errorMessage={errors.pubPlace?.message}
          />
        </Fieldset>

        <Fieldset legendText="Informações">
          {/* <FieldInput
            labelText="Número de páginas"
            inputProps={{
              placeholder: "Informe o número de páginas",
              type: "number",
              step: 1,
              min: 4,
              ...registers("pagesNumber"),
            }}
            errorMessage={errors.pagesNumber?.message}
          /> */}
          <FieldInput
            labelText="Assuntos"
            inputProps={{
              placeholder: "Informe os assuntos relativos a esta publicação",
              ...registers("subjects"),
            }}
            errorMessage={errors.subjects?.message}
          />
          <FieldInput
            labelText="Edição"
            inputProps={{
              placeholder: "Informe a edição da publicação",
              ...registers("edition"),
            }}
            errorMessage={errors.edition?.message}
          />
          <FieldInput
            labelText="Volume"
            inputProps={{
              placeholder: "Informe o volume da publicação",
              ...registers("volume"),
            }}
            errorMessage={errors.volume?.message}
          />
          <FieldInput
            labelText="Número de cópias"
            inputProps={{
              placeholder: "Informe o número de exemplares",
              type: "number",
              step: 1,
              min: 1,
              defaultValue: 1,
              ...registers("copies"),
            }}
            errorMessage={errors.copies?.message}
          />
        </Fieldset>
      </Form>
    </>
  );
}
