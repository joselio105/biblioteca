import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    title: yup.string().required('É necessário informar o título da publicação'),
    authorCode: yup.string().required('É necessário informar o código do autor'),
    themeCode: yup.string().required('É necessário informar o código do tema')})

export const publicationResolver = yupResolver(schema)