import { ReactNode } from "react";
import { IUser } from "./user";

export interface IAuthContextData {
    signIn: (credentials: ICredentials)=>Promise<ISigIn>
    signOut: ()=>void
    refresh: (token:string)=>Promise<IAuthentication>
    isSigned: boolean
    authentication: IAuthentication
}

export interface IAuthentication {
    user: IUser
    token: string
    expiration: number
}

export interface ISigIn {
    message: string;
    isSigned: boolean;
    user?: IUser;
    error?: string;
  }

export interface ICredentials {
    email: string
    password: string
}

export interface IAuthProvider {
    children: ReactNode
}