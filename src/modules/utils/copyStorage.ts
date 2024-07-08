import { ICopy } from "../types/copy"

const itemKey = 'copies'

const read = ():ICopy[]|undefined=>{
    const copies = localStorage.getItem(itemKey)

    return copies ? JSON.parse(copies) : undefined
}

const save = (copies: ICopy[])=>{
    const content = JSON.stringify(copies)

    localStorage.setItem(itemKey, content)
}

const append = (copy:ICopy)=>{
    const stored = read()
    if(stored){
        save([copy, ...stored])
    }
}

const clean = ()=>{
    localStorage.removeItem(itemKey)
}

export const copyStorage = {read, save, append, clean}