import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const regexAuthor = /^(\w+)\,\s([\w+\.?\s?]+);?/

const schema = yup.object().shape({
    title: yup.string().required('É necessário informar o título da publicação'),    
    subTitle: yup.string(),
    originalTitle: yup.string(),
    publicationLanguage: yup.string().required('É necessário definir o idioma da publicação'),
    originalLanguage: yup.string(),
    authors: yup.array(yup.string().required().matches(regexAuthor, 'É necessário estar no padão: Sobrenome, Primeiro Nome')),
    translator: yup.string(),
    isbn: yup.string(),
    authorCode: yup.string(),
    themeCode: yup.string().required('É necessário informar o código do tema da publicação'),
    publisher: yup.string(),
    pubDate: yup.string(),
    pubOriginalDate: yup.string(),
    pubPlace: yup.string(),
    subjects: yup.string(),
    pagesNumber: yup.string(),
    edition: yup.string(),
    volume: yup.string(),
    copies: yup.number().required('É necessário informar a quantidade de cópias a serem cadastradas').moreThan(0, 'É necessário cadastrar ao menos uma cópia'),    
    createdAt: yup.number().required('É necessário informar quando foi cadastrada a publicação'),
    createdBy: yup.string().required('É necessário informar quem cadastrou a publicação'),
    updatedAt: yup.number().required('É necessário informar quando foi editada a publicação'),
    updatedBy: yup.string().required('É necessário informar quem editou a publicação'),
})

export const publicationResolver = yupResolver(schema)