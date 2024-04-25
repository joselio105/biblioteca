export const now = () => new Date().valueOf()

export const getDate = (timestamp?:number) => timestamp?new Date(timestamp).toLocaleDateString():null
