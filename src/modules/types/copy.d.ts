import { Ipublication } from "./publication"

export interface ICopy {
    id: string
    publicationId: string
    publication?: Ipublication
    registrationCode: string
}