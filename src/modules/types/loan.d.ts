import { ICopy } from "./copy"
import { IUser } from "./user"

export interface ILoan {
    id: string
    userId: string
    user: IUser
    copyId: string
    copy: ICopy
    loan: number
    return: number
    returnedAt?: number
}