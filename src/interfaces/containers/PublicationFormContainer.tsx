import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { PublicationForm } from "../ui/PublicationForm";
import { publicationResolver as resolver } from "@infra/schemas/publication";
import {
  findPublicationById,
  findPublicationByIsbn,
  insertPublication,
  updatePublication,
} from "@infra/api/publications";
import { IPublication, IPublicationForm } from "@/modules/types/publication";
import {
  formToData,
  isbnToMain,
  mainToForm,
} from "@infra/mappers/publicationMappers";
import { countCopiesByYear, insertCopy } from "@/modules/infra/api/copy";
import { ICopy, ICopyForm } from "@/modules/types/copy";

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
    control,
    formState: { errors },
  } = useForm({ resolver, values });

  const insert = (publication: IPublicationForm) => {
    const data = formToData(publication);

    setIsLoading(true);
    insertPublication(data)
      .then(async (response) => {
        setFeedbackMessage("Publicação cadastrada com sucesso");
        setSuccess(true);
        const year = new Date(publication.createdAt).getFullYear();
        const counter = await countCopiesByYear(year);

        for (let count = 0; count < publication.copies; count++) {
          const copy = {
            publicationId: response.id,
            year,
            publication: response,
            registrationCode: `bib.${year}.${count + counter + 1}`,
          };

          insertCopy(copy)
            .then(() => {
              navigate("/publications");
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
        }
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
    console.log("UPDATE", data);

    setIsLoading(true);
    updatePublication(data)
      .then(() => {
        setSuccess(true);
        setFeedbackMessage("Publicação alterado com sucesso");
        navigate("/publication/" + id);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setFeedbackMessage("Falha ao alterar publicação");
      })
      .finally(() => setIsLoading(false));
  };

  const handlerSubmit = (value: IPublicationForm) => {
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
      handleSubmit={handleSubmit(handlerSubmit, (err) => {
        console.log(err);
      })}
      registers={register}
      watch={watch}
      control={control}
      errors={errors}
    />
  );
}
