import { api } from "@utils/fetchApi";
import { ICopy } from "@/modules/types/copy";

const endpoint = 'copys'

export async function findManyCopysByPublicationId(publicationId:string) {
    const copys = await api.get<ICopy[]>(endpoint)
    return copys.filter(copy=>copy.publicationId===publicationId)
}

export async function findCopyById(id: string) {
    const copy = await api.get<ICopy>(`${endpoint}/${id}`)

    return copy
}