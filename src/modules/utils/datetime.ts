const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

export const now = () => new Date().valueOf()

export const getDate = (timestamp?:number) => timestamp?new Date(timestamp).toLocaleDateString():null

export const getTimestampPusDays = (days: number)=>(now()+(days * day))
