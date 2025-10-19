import { signal } from "@angular/core";
import { cartModel } from "../app/models/cart.model";
import { toyModel } from "../app/models/toy.model";

export class cartService{
    static getCart():cartModel[]{
        if(!localStorage.getItem('cart'))
            localStorage.setItem('cart', JSON.stringify([]))

        return JSON.parse(localStorage.getItem('cart')!)
    }

    static addToy(toy:toyModel){
        const cart = this.getCart()
        const existingToy = cart.find(item=>item.toy.toyId === toy.toyId)

        if(existingToy){
            existingToy.quantity+=1
        }
        else{
            cart.push({toy, quantity:1})
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    static getAmmount():number{
        const cart = this.getCart()
        let total = 0
        for(let c of cart){
            total+= c.toy.price * c.quantity
        }

        return total
    }

    static clearCart(){
        localStorage.removeItem('cart')
    }

}