import { api } from "@utils/fetchApi";
import { ILoan } from "@/modules/types/loan";

const endpoint = 'loans'

export async function findAllLoans() {
    const loans = await api.get<ILoan[]>(endpoint)
    return loans
    // .map(loan=>{
    //     findUserById(loan.userId).then(response=>{loan.user = response})
    //     findCopyById(loan.copyId).then(response=>{loan.copy = response})

    //     return loan
    // })
}

export async function findManyLoansByUserId(userId:string){
    const loans = await findAllLoans()
    return loans.filter(loan=>loan.userId===userId)
}

export async function findLoanById(id: string) {
    return api.get<ILoan>(`${endpoint}/${id}`)
}