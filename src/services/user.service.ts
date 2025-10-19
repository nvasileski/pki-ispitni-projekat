import { find } from "rxjs"
import { userModel } from "../app/models/user.model"
import { cartModel } from "../app/models/cart.model"
import { cartService } from "./cart.service"

export class userService {


    static getUsers(): userModel[] {
        if (!localStorage.getItem('users'))
            localStorage.setItem('users', JSON.stringify([{
                firstName: 'Nikola',
                lastName: 'Vasileski',
                email: 'user@example.com',
                contactPhone: '+381555333',
                password: '123',
                favoriteToyType: 'Slagalica',
                reservation: []
            }]))


        return JSON.parse(localStorage.getItem('users')!)
    }


    static findUserByEmail(email: string) {
        const users: userModel[] = this.getUsers()
        const exactuser = users.find(u => u.email === email)

        if (!exactuser) {
            throw new Error('USER NOT FOUND')
        }

        return exactuser
    }

    static login(email: string, password: string) {
        const user = this.findUserByEmail(email)
        if (user.password !== password) {
            alert('BAD CREDENTIALS')
            return false
        }

        localStorage.setItem('active', user.email)
        return true
    }

    static signup(payload: userModel) {
        const users: userModel[] = this.getUsers()
        users.push(payload)
        localStorage.setItem('users', JSON.stringify(users))
    }

    static activeUser() {
        const active = localStorage.getItem('active')

        if (!active) {
            throw new Error('USER NOT FOUND')
        }

        return this.findUserByEmail(active)
    }

    static updateUser(userNew: userModel) {
        const active = this.activeUser()
        const users = this.getUsers()

        users.forEach(u => {
            if (u.email === active.email) {
                u.firstName = userNew.firstName,
                    u.lastName = userNew.lastName,
                    u.contactPhone = userNew.contactPhone,
                    u.favoriteToyType = userNew.favoriteToyType
            }
        })
        localStorage.setItem('users', JSON.stringify(users))
    }

    static newPassword(password: string) {
        const active = this.activeUser()
        const users = this.getUsers()

        users.forEach(u => {
            if (u.email === active.email) {
                u.password = password
            }
        })

        localStorage.setItem('users', JSON.stringify(users))
    }

    static checkOut(cart: cartModel[], total: number) {
        const active = this.activeUser()
        const users = this.getUsers()



        users.forEach(u => {
            if (u.email === active.email) {
                u.reservation.push({
                    items: cart,
                    total: total,
                    createdAt: new Date().toISOString(),
                    status: 'waiting',
                    updatedAt: null
                })
            }
        })

        localStorage.setItem('users', JSON.stringify(users))
    }

    static changeStatus(createdAt: string, newStatus: 'canceled' | 'arrived' | 'waiting') {
        const users = this.getUsers()
        const active = this.activeUser()

        users.forEach(u => {
            if (u.email === active.email) {
                u.reservation.forEach(r => {
                    if (r.createdAt === createdAt) {
                        r.updatedAt = new Date().toISOString(),
                            r.status = newStatus
                    }
                })
            }
        })
        localStorage.setItem('users', JSON.stringify(users))
    }
    static getReservations() {
        return this.activeUser().reservation
    }

    static logout() {
        localStorage.removeItem('active')
    }
}

