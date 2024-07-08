import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    email: yup.string().required('É necessário informar o email do usuário').email('Formato de email inválido'),
    password: yup.string().required('É necessário informar a senha do usuário')
})

export const authResolver = yupResolver(schema)