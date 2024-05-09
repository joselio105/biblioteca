import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { publicationResolver as resolver } from "@infra/schemas/publication";
import { useAuth } from "@/modules/hooks/useAuth";
import { IPublication, IPublicationForm } from "@/modules/types/publication";
import {
  findPublicationById,
  findPublicationByIsbn,
  insertPublication,
  updatePublication,
} from "@/modules/infra/api/publications";
import { PublicationForm } from "../ui/PublicationForm";
import {
  formToData,
  isbnToMain,
  mainToForm,
} from "@/modules/infra/mappers/publicationMappers";

// TODO: - Gerar código Cutter
// TODO: - Validar autor(es) -> Sobrenome, Nome
// TODO: - Gerar mais Campos de autores
// TODO: - Corrigir Número de páginas

export function PublicationFormContainer() {
  const { id, isbn } = useParams();
  const {
    authentication: { user: userLogged },
  } = useAuth();
  const navigate = useNavigate();
  const [publication, setPublication] = useState<IPublication | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const values = id ? mainToForm(publication) : undefined;
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ resolver, values });

  const insert = (publication: IPublicationForm) => {
    const data = formToData(publication);
    console.log(data);

    setIsLoading(true);
    insertPublication(data)
      .then(() => {
        setFeedbackMessage("Publicação cadastrada com sucesso");
        setSuccess(true);
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setFeedbackMessage("Falha ao cadastar publicação");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const update = (id: string, publication: IPublicationForm) => {
    const data = formToData(publication, id);
    console.log(data);

    setIsLoading(true);
    updatePublication(data)
      .then(() => {
        setSuccess(true);
        setFeedbackMessage("Publicação alterado com sucesso");
        navigate("/user/" + id);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setFeedbackMessage("Falha ao alterar publicação");
      })
      .finally(() => setIsLoading(false));
  };

  const handlerSubmit = (value: IPublicationForm) => {
    console.log("submit");

    id && id !== "NOT" ? update(id, value) : insert(value);
  };

  const fetchPublication = (id: string) => {
    findPublicationById(id).then((response) => setPublication(response));
  };

  const fetchPublicationByISBN = (isbn: string) => {
    findPublicationByIsbn(isbn)
      .then((publication) => {
        setPublication(isbnToMain(publication, userLogged.id));
      })
      .catch((err) => setFeedbackMessage(err.message));
  };

  useEffect(() => {
    if (id && id !== "NOT") {
      fetchPublication(id);
    }
    if (isbn) {
      fetchPublicationByISBN(isbn);
    }
  }, [id, isbn]);

  return (
    <PublicationForm
      userLogged={userLogged}
      publication={publication}
      isLoading={isLoading}
      success={success}
      feedbackMessage={feedbackMessage}
      handleSubmit={handleSubmit(handlerSubmit, (err) => console.log(err))}
      registers={register}
      watch={watch}
      errors={errors}
    />
  );
}
