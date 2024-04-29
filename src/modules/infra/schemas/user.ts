import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { phoneRegEx } from '@constants/regerPatterns'

const schema = yup.object().shape({
    name: yup.string().required('É necessário informar o nome do usuário'),
    email: yup.string().required('É necessário informar o email do usuário').email('Formato de email inválido'),
    phone: yup.string().required('É necessário informar o telefone do usuário').matches(phoneRegEx, 'Formato de telefone inválido'),
    isAdmin: yup.string().required('É necessário definir se o usuário é do tipo Admi'),
    isActive: yup.string().required('É necessário definir se o usuário está ativo')
})

export const userResolver = yupResolver(schema)