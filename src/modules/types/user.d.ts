export interface IUser {
    id: string
    name: string
    email?: string
    phone?: string
    isActive: boolean
    isAdmin: boolean
}

export interface IUserForm {
    name: string
    email: string
    phone: string
    isActive: string
    isAdmin: string
}