import { IData } from "@/modules/types/data";
import { now } from "@/modules/utils/datetime";
import { IPublication, IPublicationForm, IPublicationIsbn } from "@/modules/types/publication";
import { getCutterCode } from "@/modules/utils/cutter";

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
    return {
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
        pagesNumber: page_count,
        originalLanguage: "pt",
        themeCode: "",
        authorCode: "",
        createdAt: now(),
        createdBy: userId,
        updatedAt: now(),
        updatedBy: userId,
      } as IPublication
}

export function formToData(publication: IPublicationForm, id?:string):IData{
    const response:IData = {
        title: publication?.title,
        themeCode: publication?.themeCode,
        authorCode: publication.authorCode?publication.authorCode:getCutterCode(publication),
        originalLanguage: publication.originalLanguage,
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
    // pagesNumber: publication?.pagesNumber,
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