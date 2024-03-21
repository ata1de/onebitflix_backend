// src/controllers/usersController.ts

import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
    show: async (req: AuthenticatedRequest, res: Response) => {
        const currentUser = req.user
    
        try {
          return res.json(currentUser)
        } catch (err) {
          if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
          }
        }
      },

    // PUT /users/current
    update: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.user!
        const { firstName, lastName, phone, email, birth } = req.body

        try {
        const updatedUser = await userService.update(id, {
            firstName,
            lastName,
            phone,
            email,
            birth
        })

        return res.json(updatedUser)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }, 

    // PUT/user/current/password
    updatePassword: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        const { currentPassowrd, newPassword } = req.body

        if (!user) {
            return res.status(401).json({ message: 'User not authorized' })
          }

        user.checkPassword(currentPassowrd, async(err, isSame) =>{
            try {
                if (err) throw err
                if (!isSame) throw new Error('Wrong Password!')
    
                await userService.updatePassword(user.id, newPassword)
                res.status(204).send()
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ message: err.message })
                }
            }
           
        })
    }, 

    // GET /users/current/watching
    watching: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.user!

        try {
        const watching = await userService.getKeepWatchingList(id)
        return res.json(watching)
        } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
        }
        }
    },


}