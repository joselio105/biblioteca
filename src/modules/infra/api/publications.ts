import { api } from "@utils/fetchApi";
import { IData, IQueryString } from "@/modules/types/data";
import { IPublication } from "@/modules/types/publication";

const endpoint = 'publications'

export async function findManyPublications(query:IQueryString) {
    const publications = await api.get<IPublication[]>(endpoint)
    return publications.filter(publication => {
        const compareTitle = publication.title.split(' ').map(splited=>(splited===query?.query)).find(compare=>compare)??false
        const compareAuthor = publication.author ? 
        publication.author.replace(',', '').split(' ').map(splited=>(splited===query?.query)).find(compare=>compare)??false
        :false

        return compareTitle||compareAuthor
    })
}

export async function findPublicationById(id: string) {
    return api.get<IPublication>(`${endpoint}/${id}`)
}

export async function insertPublication(publication: IData){
    return api.post(endpoint, publication)
}

export async function updatePublication(publication: IData) {
    return api.put(`${endpoint}/${publication.id}`, publication)
}