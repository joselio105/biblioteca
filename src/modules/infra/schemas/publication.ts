import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const regexAuthor = /[[a-zA-Z]+\,.+|\S]/

const schema = yup.object().shape({
    title: yup.string().required('É necessário informar o título da publicação'),    
    subTitle: yup.string(),
    originalTitle: yup.string(),
    originalLanguage: yup.string().required('É necessário definir o idioma da publicação'),
    authors: yup.array().of(yup.string().required().matches(regexAuthor)),
    //https://stackoverflow.com/questions/56855869/yup-validate-is-either-string-or-array-of-strings
    translator: yup.string(),
    isbn: yup.string(),
    authorCode: yup.string(),
    themeCode: yup.string().required('É necessário informar o código do tema da publicação'),
    publisher: yup.string(),
    pubDate: yup.string(),
    pubOriginalDate: yup.string(),
    pubPlace: yup.string(),
    subjects: yup.string(),
    // pagesNumber: yup.number().nullable().transform((__, val)=>(val===''?null:val)),
    edition: yup.string(),
    volume: yup.string(),
    copies: yup.number().required('É necessário informar a quantidade de cópias a serem cadastradas').moreThan(0, 'É necessário cadastrar ao menos uma cópia'),    
    createdAt: yup.number().required('É necessário informar quando foi cadastrada a publicação'),
    createdBy: yup.string().required('É necessário informar quem cadastrou a publicação'),
    updatedAt: yup.number().required('É necessário informar quando foi editada a publicação'),
    updatedBy: yup.string().required('É necessário informar quem editou a publicação'),
})

export const publicationResolver = yupResolver(schema)