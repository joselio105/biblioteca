export interface ILanguage {
    name: string
    code: 'pt'|'en'|'es'
    ignore: string[]
}

export const languages:ILanguage[] = [
    {
        name: 'Português',
        code: 'pt',
        ignore: ['o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas']
    },
    {
        name: 'Inglês',
        code: 'en',
        ignore: ['a', 'an', 'the']
    },
    {
        name: 'Espanhol',
        code: 'es',
        ignore: ['el', 'la', 'lo', 'las', 'los', 'un', 'una']
    },
]