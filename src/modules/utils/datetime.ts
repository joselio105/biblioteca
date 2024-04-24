export const now = () => new Date().valueOf()

export const getDate = (timestamp:number) => new Date(timestamp).toLocaleDateString()
