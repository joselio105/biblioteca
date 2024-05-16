import { api } from "@utils/fetchApi";
import { ICopy } from "@/modules/types/copy";
import { IData } from "@/modules/types/data";

const endpoint = 'copys'

export async function findManyCopysByPublicationId(publicationId:string) {
    const copys = await api.get<ICopy[]>(endpoint)
    return copys.filter(copy=>copy.publicationId===publicationId)
}

export async function findCopyById(id: string) {
    const copy = await api.get<ICopy>(`${endpoint}/${id}`)

    return copy
}

export async function findCopyByRegistrationCode(registrationCode: string) {
    const copies = await api.get<ICopy[]>(endpoint)
    const copy = copies.find(copy=>copy.registrationCode===registrationCode)

    return copy
}

export function countCopiesByYear(year: number) {
    return api.get<ICopy[]>(endpoint).then(response=>(response.filter(copy=>(copy.year===year)).length))

}

export async function insertCopy(copy: IData){
    return api.post(endpoint, copy)
}