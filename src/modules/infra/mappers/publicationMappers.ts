import { IData } from "@/modules/types/data";
import { now } from "@/modules/utils/datetime";
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
    return {
        id: "",
        title,
        subTitle: subtitle ?? '',
        authors,
        isbn,
        publisher,
        pubPlace: location ?? '',
        subjects: subjects?.join(", "),
        pagesNumber: page_count,
        pubDate: String(year),
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
        authorCode: publication?.authorCode ?? "",
        themeCode: publication?.themeCode,
        authors: publication.authors?.join("; ") ?? "",
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
    authors: publication?.authors,
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