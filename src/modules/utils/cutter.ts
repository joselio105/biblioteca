import { ILanguage, languages } from "@/data/languages";
import { IPublicationForm } from "../types/publication";
import { cutterTable } from "@/data/cutter";

export function getCutterCode({title, originalTitle, originalLanguage, authors}:IPublicationForm): string{
    const titleArray = getTitleArray(title, originalLanguage, originalTitle)
    const titleCleanned = getTitleCleanned(titleArray, originalLanguage)
    const author = getAuthor(titleCleanned, authors)
    const authorCode = getAuthorCode(author)

    return titleCleanned===author.toLowerCase() ? `${author[0]}${authorCode}` : `${author[0]}${authorCode}${titleCleanned[0]}`
}

function getLanguageInfo(originalLanguage:string): ILanguage {
    return languages.find(language=>language.code===originalLanguage) ?? {} as ILanguage
}

function getTitleArray(title:string, originalLanguage: string, originalTitle?: string)
:string[]{

    const titleString = originalLanguage==='pt' ? title : originalTitle??'Ç'
    return titleString.toLowerCase().split(' ')
}

function getTitleCleanned(title: string[], originalLanguage: string): string{
    return getLanguageInfo(originalLanguage).ignore.find(word=>word===title[0])?title[1]:title[0]
}

function getAuthor(titleCleanned:string, authors?: string[]):string{
    const author = authors && authors.length>0 ? authors[0].split(', ')[0] :  titleCleanned

    return capitalize(author)
}

function getAuthorCode(author:string):string{
    const cutterIndex = author.substring(0, 2)
    const subTable = cutterTable[cutterIndex]
    if(subTable){
        const matches = subTable.filter(({string})=>{
            const check = author.substring(0, string.length)

            return check === string
        })

        return matches[matches.length-1].code
    }

    throw new Error("Autor não encontrado");
    
}

function capitalize(name:string):string {
    const firstLetter = name[0];
    if (firstLetter) {
      return firstLetter.toUpperCase() + name.substring(1).toLowerCase();
    }

    return name;
  };