// src/services/categoryService.ts

import { Category } from '../models'

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage

    const { count, rows } = await Category.findAndCountAll({
      attributes: ['id', 'name', 'position'],
      order: [['position', 'ASC']],
      limit: perPage,
      offset
    })
    
    return {
      categories: rows,
      page,
      perPage,
      total: count
    }
  },

  findByIdWithCourses: async (id: string) => {
    const categoryWithCourses = await Category.findByPk(id, {
      attributes: ['id', 'name'],
      include: {
        // nome da associação entre curso e categoria
        association: 'courses',
        // atributos para pegar dos cursos
        attributes:[
          'id',
          'name',
          'synopsis',
          // renomeando o nome no DB para cameCase
          ['thumbnail_url', 'thumbnailUrl']
        ]
      }
    })

    return categoryWithCourses
  }
}