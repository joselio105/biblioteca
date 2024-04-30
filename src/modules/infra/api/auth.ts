import { ICredentials, ISigIn } from "@/modules/types/auth";

export async function login(credentials:ICredentials) {
    return {
        isSigned:true,
        message:"Usuário logado com sucesso",
        user: {
            id: '7d61',
            name: 'Papai Noel',
            email: credentials.email,
            phone: '(09)87654-3210',
            isActive: true,
            isAdmin: true
        }
    } as ISigIn
}