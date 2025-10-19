import axios from "axios";
import { toyModel } from "../app/models/toy.model";

const client = axios.create({
    baseURL: 'https://toy.pequla.com/api',
    validateStatus:(status:number) => status === 200,
    headers:{
        "Accept":"application/json",
        "X-Name":"PKI-2025"
    }
})

export class toyService{
    static async getToys(){
        return await client.get<toyModel[]>(`/toy`)
    }

    static async getToysById(id: number){
        return await client.get<toyModel>(`/toy/${id}`)
    } 
}