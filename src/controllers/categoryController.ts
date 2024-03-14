// src/controllers/categories-controller.ts

import { Request, Response } from 'express'
import { getPaginationParams } from '../helpers/getPaginationParams'
import { categoryService } from '../services/categoryServices'

const categoriesController = {
  //  GET/categories
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query)

    try {
      const paginatedCategories = await categoryService.findAllPaginated(page, perPage)
      return res.json(paginatedCategories)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  //   GET/categories/id
  show: async(req: Request, res: Response) => {
    const {id} = req.params
    
    try {
      const category = await categoryService.findByIdWithCourses(id)
      res.status(200).json(category)
    } catch (error) {
      if (error instanceof Error){
        return res.status(400).json({message: error.message})
      }
    }
  }
}

export { categoriesController }