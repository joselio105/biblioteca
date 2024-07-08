import { now } from "@utils/datetime";
import { getCutterCode } from "@utils/cutter";
import { IData } from "@/modules/types/data";
import { IPublication, IPublicationForm, IPublicationIsbn } from "@/modules/types/publication";

export function isbnToMain({
    title,
    authors,
    isbn,
    publisher,
    location,
    subtitle,
    subjects,
    year,
    page_count}: IPublicationIsbn, userId: string){
    const response = {
        id: "",
        title,
        subTitle: subtitle ?? '',
        authors: authors.sort((a,b)=>{
          const namesA = a.split(' ')
          const namesB = b.split(' ')

          return namesA[namesA.length-1].localeCompare(namesB[namesB.length-1])
        }).join('; '),
        isbn,
        publisher,
        pubPlace: location ?? '',
        pubDate: year?String(year):'',
        subjects: subjects?.join(", "),
        publicationLanguage: "pt",
        createdAt: now(),
        createdBy: userId,
        updatedAt: now(),
        updatedBy: userId,
      } as IPublication

      if(page_count && page_count !== null){
        response.pagesNumber = String(page_count)
      }

      return response
}

export function formToData(publication: IPublicationForm, id?:string):IData{
    const response:IData = {
        title: publication?.title,
        themeCode: publication?.themeCode,
        authorCode: publication.authorCode?publication.authorCode:getCutterCode(publication),
        publicationLanguage: publication.publicationLanguage,
        createdAt: publication?.createdAt,
        updatedAt: publication?.updatedAt,
        createdBy: publication?.createdBy,
        updatedBy: publication?.updatedBy,
      }

      if(publication.subTitle){
        response.subTitle = publication.subTitle
      }
      if(publication.originalTitle){
        response.originalTitle = publication.originalTitle
      }
      if(publication.originalLanguage){
        response.originalLanguage = publication.originalLanguage
      }
      if(publication.authors && publication.authors?.length>0){
        response.authors = publication.authors.join('; ')
      }
      if(publication.publisher){
        response.publisher = publication.publisher
      }
      if(publication.pubDate){
        response.pubDate = publication.pubDate
      }
      if(publication.pubOriginalDate){
        response.pubOriginalDate = publication.pubOriginalDate
      }
      if(publication.pubPlace){
        response.pubPlace = publication.pubPlace
      }
      if(publication.subjects){
        response.subjects = publication.subjects
      }
      if(publication.isbn){
        response.isbn = publication.isbn
      }
      if(publication.pagesNumber){
        response.pagesNumber = publication.pagesNumber
      }
      
      return id ? {id, ...response} : response
}

export function mainToForm(publication?:IPublication):IPublicationForm{
return publication ? {
    title: publication?.title,
    subTitle: publication?.subTitle,
    authorCode: publication?.authorCode,
    themeCode: publication?.themeCode,
    authors: publication?.authors?.split('; '),
    publisher: publication?.publisher,
    pubDate: publication?.pubDate,
    pubPlace: publication?.pubPlace,
    pagesNumber: publication?.pagesNumber,
    publicationLanguage: publication?.publicationLanguage,
    originalLanguage: publication?.originalLanguage,
    subjects: publication?.subjects,
    isbn: publication?.isbn,
    createdAt: publication?.createdAt,
    updatedAt: publication?.updatedAt,
    createdBy: publication?.createdBy,
    updatedBy: publication?.updatedBy,
    copies: 1
  }: {} as IPublicationForm
}