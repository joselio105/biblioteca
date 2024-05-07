import { ICredentials, ISigIn } from "@/modules/types/auth";
import { findUserById } from "./user";

export async function login(credentials:ICredentials) {
    const user = await findUserById('7d61')
    return {
        isSigned:true,
        message:"Usuário logado com sucesso",
        user
    } as ISigIn
}