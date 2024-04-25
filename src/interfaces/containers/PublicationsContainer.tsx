import { useState } from "react";
import { Publications } from "../interfaces/Publications";
import { findManyPublications } from "@infra/api/publications";
import { IPublication } from "@/modules/types/publication";

export function PublicationsContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [publications, setPublications] = useState<IPublication[]>(
    [] as IPublication[]
  );

  const executeQuery = (query: string) => {
    setIsLoading(true);
    setIsSubmited(true);
    findManyPublications({ query })
      .then((response) => {
        setPublications(response);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Publications
      publications={publications}
      executeQuery={executeQuery}
      isLoading={isLoading}
      isSubmited={isSubmited}
    />
  );
}
