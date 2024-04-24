import { api } from "@utils/fetchApi";
import { IUser } from "@/modules/types/user";
import { IQueryString } from "@/modules/types/data";

export async function findManyUsers(query?: IQueryString){
    const usersList = await api.get<IUser[]>('users')
    
    return usersList.filter(user=>{
        const nameCompare = user.name.split(' ').map(nameSplited=>(nameSplited===query?.query)).find(compare=>compare)??false
        const emailCompare = user.email?.split('@').map(emailSplited=>(emailSplited===query?.query)).find(compare=>compare)??false
        const phoneCompare = user.phone===query?.query
        
        return nameCompare || emailCompare || phoneCompare
    })
}