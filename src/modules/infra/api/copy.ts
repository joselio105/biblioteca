import { ICopy } from "@/modules/types/copy";
import { IQueryString } from "@/modules/types/data";
import { api } from "@/modules/utils/fetchApi";
import { findPublicationById } from "./publications";
import { Ipublication } from "@/modules/types/publication";

const endpoint = 'copys'

export async function findManyCopys(query: IQueryString) {
    const copys = await api.get<ICopy[]>(endpoint)

    return copys
}

export async function findCopyById(id: string) {
    const copy = await api.get<ICopy>(`${endpoint}/${id}`)
    findPublicationById((copy).publicationId).then(response=>copy.publication = response??{}as Ipublication)

    return copy
}