import { User } from "../models"
import { UserCreationAttributes } from "../models/User"

export const userService = {
    findbyEmail: async(email:string) => {
        const user = await User.findOne({
            where: {
                email
            }
        })

        return user
    },

    // colocando as propriedades do User para evitar escrever tudo
    create: async(attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user 
    }
}