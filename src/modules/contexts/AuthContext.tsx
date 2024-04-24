import { createContext, useState } from "react";
import {
  IAuthContextData,
  IAuthProvider,
  IAuthentication,
  ICredentials,
} from "../types/auth";

export const AuthContext = createContext({} as IAuthContextData);

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const [isSigned, setIsSigned] = useState(true);
  const [authentication, setAuthentication] = useState<IAuthentication>({
    user: {
      id: "xxx",
      name: "Monteiro Lobato",
      email: "lobato@sitio.pp.a",
      phone: null,
      isAdmin: true,
      isActive: true,
    },
    expiration: 0,
    token: "",
  } as IAuthentication);

  const signIn = async (credentials: ICredentials) => {
    throw new Error("Função não implementada");
  };

  const signOut = () => {
    setIsSigned(false);
    setAuthentication({} as IAuthentication);
  };

  const refresh = async (token: string) => {
    throw new Error("Função não implementada");
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, refresh, isSigned, authentication }}
    >
      {children}
    </AuthContext.Provider>
  );
};
