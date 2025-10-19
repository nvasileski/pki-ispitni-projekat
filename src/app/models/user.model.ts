import { reservationModel } from "./reservation.model"

export interface userModel {
    firstName: string,
    lastName: string,
    email: string,
    contactPhone: string,
    password: string,
    favoriteToyType: string
    reservation: reservationModel[]
}