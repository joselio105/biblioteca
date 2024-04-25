import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Publication } from "../interfaces/Publication";
import { findPublicationById } from "@infra/api/publications";
import { IPublication } from "@/modules/types/publication";
import { ICopy } from "@/modules/types/copy";
import { findManyCopysByPublicationId } from "@/modules/infra/api/copy";

export function PublicationContainer() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [copys, setCopys] = useState<ICopy[]>([] as ICopy[]);
  const [publication, setPublication] = useState<IPublication>(
    {} as IPublication
  );

  const fetchPublication = (id: string) => {
    findPublicationById(id).then((response) => setPublication(response));
  };

  const fetchCopys = (publicationId: string) => {
    setIsLoading(true);
    findManyCopysByPublicationId(publicationId)
      .then((response) => setCopys(response))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPublication(id ?? "");
    fetchCopys(id ?? "");
  }, [id]);

  return (
    <Publication
      publication={publication}
      copys={copys}
      isLoading={isLoading}
    />
  );
}
