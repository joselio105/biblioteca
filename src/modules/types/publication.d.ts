// import { string } from "./data"

import { string } from "yup"

export interface IPublication {
    id: string
    title: string
    subTitle?: string
    originalTitle?: string
    originalLanguage: string
    authors?: string
    translator?: string
    isbn?: string
    authorCode: string
    themeCode: string
    publisher?: string
    pubDate?: string
    pubOriginalDate?: string
    pubPlace?: string
    subjects?: string
    pagesNumber?: string
    edition?: string
    volume?: string
    createdAt: number
    createdBy: string
    updatedAt: number
    updatedBy: sting
}

export interface IPublicationForm {
    title: string
    subTitle?: string
    originalTitle?: string
    originalLanguage: string
    authors?: string[]
    translator?: string
    isbn?: string
    authorCode?: string
    themeCode: string
    publisher?: string
    pubDate?: string
    pubOriginalDate?: string
    pubPlace?: string
    subjects?: string
    pagesNumber?: string
    edition?: string
    volume?: string
    copies: number
    createdAt: number
    createdBy: string
    updatedAt: number
    updatedBy: sting
}

export interface IPublicationIsbn {
    
        isbn: string
        title: string
        subtitle?: string
        authors: string[]
        publisher?: string
        synopsis?: string
        dimensions?: {
          width?: number
          height?: number
          unit?: string
        },
        year?: number
        format?: string
        page_count?: number
        subjects?: string[]
        location?: string
        retail_price?: string
        cover_url?: strig
        provider?: strin
    }
      
