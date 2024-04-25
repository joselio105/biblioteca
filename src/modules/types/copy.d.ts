import { IPublication } from "./publication"

export interface ICopy {
    id: string
    publicationId: string
    publication?: IPublication
    registrationCode: string
}