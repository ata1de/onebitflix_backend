import { Request, Response } from "express";
import { userService } from "../services/userService";

export const authController = {
    register: async(req: Request, res:Response) => {
        const { firstName, lastName, email, password, birth, phone } = req.body
        try {
            const UserAlreadyExists = await userService.findbyEmail(email)

            if (UserAlreadyExists) {
                throw new Error('Este email já está cadastrado!')
            }

            const user = await userService.create({
                firstName,
                lastName,
                email,
                password,
                birth,
                phone,
                role: 'user'
            })

            res.status(200).json(user)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    }
}