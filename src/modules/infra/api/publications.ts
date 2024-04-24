import { api } from "@utils/fetchApi";
import { IQueryString } from "@/modules/types/data";
import { Ipublication } from "@/modules/types/publication";

const endpoint = 'publications'

export async function findManyPublications(query:IQueryString) {
    const publications = await api.get<Ipublication[]>(endpoint)
    return publications.filter(publication => {
        const compareTitle = publication.title.split(' ').map(splited=>(splited===query?.query)).find(compare=>compare)??false
        const compareAuthor = publication.author ? 
        publication.author.split(' ').map(splited=>(splited===query?.query)).find(compare=>compare)??false
        :false

        return compareTitle||compareAuthor
    })
}

export async function findPublicationById(id: string) {
    return api.get<Ipublication>(`${endpoint}/${id}`)
}