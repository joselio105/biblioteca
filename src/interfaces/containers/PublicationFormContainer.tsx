import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { publicationResolver as resolver } from "@infra/schemas/publication";
import { IData } from "@/modules/types/data";
import { useAuth } from "@/modules/hooks/useAuth";
import { IPublication, IPublicationForm } from "@/modules/types/publication";
import {
  findPublicationById,
  insertPublication,
  updatePublication,
} from "@/modules/infra/api/publications";
import { PublicationForm } from "../ui/PublicationForm";

export function PublicationFormContainer() {
  const { id } = useParams();
  const {
    authentication: { user: userLogged },
  } = useAuth();
  const navigate = useNavigate();
  const [publication, setPublication] = useState<IPublication | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const values = id
    ? ({
        title: publication?.title,
        authorCode: publication?.authorCode,
        themeCode: publication?.themeCode,
        authors: publication?.authors,
      } as IPublicationForm)
    : undefined;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver, values });

  const insert = (publication: IPublicationForm) => {
    const data: IData = {
      title: publication.title,
      authorCode: publication.authorCode,
      themeCode: publication.themeCode,
      // authors: publication.authors,
    };

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
    const data: IData = {
      id: id,
      title: publication.title,
      authorCode: publication.authorCode,
      themeCode: publication.themeCode,
      // authors: publication?.authors,
    };
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
    id ? update(id, value) : insert(value);
  };

  const fetchUser = (id: string) => {
    findPublicationById(id).then((response) => setPublication(response));
  };

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  return (
    <PublicationForm
      userLogged={userLogged}
      publication={publication}
      isLoading={isLoading}
      success={success}
      feedbackMessage={feedbackMessage}
      handleSubmit={handleSubmit(handlerSubmit)}
      registers={register}
      errors={errors}
    />
  );
}
