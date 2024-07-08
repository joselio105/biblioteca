import { createContext, useState } from "react";
import {
  IAuthContextData,
  IAuthProvider,
  IAuthentication,
  ICredentials,
} from "../types/auth";
import { login } from "../infra/api/auth";
import { IUser } from "../types/user";

export const AuthContext = createContext({} as IAuthContextData);

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const [isSigned, setIsSigned] = useState(false);
  const [authentication, setAuthentication] = useState<IAuthentication>(
    {} as IAuthentication
  );

  const signIn = async (credentials: ICredentials) => {
    return login(credentials).then(({ user, isSigned, message }) => {
      setAuthentication({
        user: user ?? ({} as IUser),
        expiration: 0,
        token: "",
      });
      setIsSigned(isSigned);

      return { user, isSigned, message };
    });
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
