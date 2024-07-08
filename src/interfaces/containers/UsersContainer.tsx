import { useState } from "react";
import { Users } from "../ui/Users";
import { IUser } from "@/modules/types/user";
import { findManyUsers } from "@/modules/infra/api/user";

export function UsersContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);

  const executeQuery = (query: string) => {
    setIsLoading(true);
    setIsSubmited(true);
    findManyUsers({ query })
      .then((response) => {
        setUsers(response.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Users
      isLoading={isLoading}
      isSubmited={isSubmited}
      users={users}
      executeQuery={executeQuery}
    />
  );
}
