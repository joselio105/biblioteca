import { ICredentials, ISigIn } from "@/modules/types/auth";
import { findUserByEmail, findUserById } from "./user";

export async function login(credentials:ICredentials) {
    const user = await findUserById('7d61')
    return {
        isSigned:true,
        message:"Usuário logado com sucesso",
        user
    } as ISigIn
}

export async function checkCredentials(credentials: ICredentials) {
    const user = await findUserByEmail(credentials.email)

    return credentials.password==='123456' ? user : undefined
}