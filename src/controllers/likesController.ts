// src/controllers/likesController.ts

import { Request, Response } from 'express'
import { likeService } from '../services/likeService'
import { AuthenticatedRequest } from '../middlewares/auth'
import { favoriteService } from '../services/favoriteService'

export const likesController = {
  // POST /likes
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body

    try {
      const like = await likeService.create(userId, courseId)
      return res.status(201).json(like)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // DELETE/likes/:id
  destroy: async(req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const couserId = req.params

    try {
        likeService.delete(userId, Number(couserId))
        res.json(201).send()
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message })
          }
    }

  }
}