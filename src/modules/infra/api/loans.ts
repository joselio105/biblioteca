import { api } from "@utils/fetchApi";
import { ILoan } from "@/modules/types/loan";
import { IQueryString } from "@/modules/types/data";

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

export async function findManyLoans(query: IQueryString) {
    const loans = await api.get<ILoan[]>(endpoint)
    // console.log(loans, query)
    return loans.filter(loan=>{
        const compareUser = loan.user.name.split(' ').map(splited=>(splited===query?.query)).find(compare=>compare)??false
        const compareTitle = loan.copy?.publication?.title.split(' ').map(splited=>(splited===query.query)).find(compare=>compare)??false
        const compareRegistration = loan.copy?.registrationCode.split(' ').map(splited=>(splited===query.query)).find(compare=>compare)??false

        return compareRegistration||compareTitle||compareUser
    })

}

export async function findManyLoansByUserId(userId:string){
    const loans = await findAllLoans()
    return loans.filter(loan=>loan.userId===userId)
}

export async function findLoanById(id: string) {
    return api.get<ILoan>(`${endpoint}/${id}`)
}