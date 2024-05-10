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
    const response = {
        title: publication?.title,
        subTitle: publication?.subTitle ?? "",
        authorCode: publication?.authorCode ?? getCutterCode(publication),
        themeCode: publication?.themeCode,
        authors: publication.authors ? publication.authors.join('; '): "",
        publisher: publication?.publisher ?? "",
        pubDate: publication?.pubDate ?? "",
        pubPlace: publication?.pubPlace ?? "",
        // pagesNumber: publication?.pagesNumber ?? null,
        originalLanguage: publication?.originalLanguage,
        subjects: publication?.subjects ?? "",
        isbn: publication?.isbn ?? "",
        createdAt: publication?.createdAt,
        updatedAt: publication?.updatedAt,
        createdBy: publication?.createdBy,
        updatedBy: publication?.updatedBy,
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