import { cartModel } from "./cart.model";
import { toyModel } from "./toy.model";

export interface reservationModel{
    items: any[]
    total: number
    createdAt:string
    updatedAt: string | null
    status: 'canceled' | 'arrived'| 'waiting'
}