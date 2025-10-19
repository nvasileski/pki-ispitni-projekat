import { typeModel } from "./type.model"

export interface toyModel {
    toyId: number
    name: string
    permalink: string
    description: string
    targetGroup: string
    productionDate: string
    price: number
    ageGroup: {
        ageGroupId: number
        name: string
        description: string
    }
    type:typeModel
}