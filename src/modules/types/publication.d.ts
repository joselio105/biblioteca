export interface IPublication {
    id: string
    title: string
    authors: string
    authorCode: string
    themeCode: string
    //...
}

export interface IPublicationForm {
    title: string
    authors?: string[]
    authorCode: string
    themeCode: string
}