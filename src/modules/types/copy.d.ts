import { IPublication } from "./publication"

export interface ICopy {
    id: string
    publicationId: string
    publication?: IPublication
    year: number,
    registrationCode: string
}

export interface ICopyForm {
    publicationId: string
    publication?: IPublication
    year: number,
    registrationCode: string
}