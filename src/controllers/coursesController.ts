import { Request, Response } from "express";
import { courseService } from "../services/courseServices";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";
import { favoriteService } from "../services/favoriteService";

const coursesController = {

    // GET/courses/:id
    show: async(req: AuthenticatedRequest, res: Response) => {
        const courseId =req.params.id
        const userId = req.user!.id

        try {
            const courses = await courseService.findByIdWithEpisodes(courseId)

            if (!courses) {
                return res.status(404).json({message: 'Course not find' })
            } 
            
            const liked = await likeService.isLiked(userId, Number(courseId))
            const favorited = await favoriteService.isFavorited(userId, Number(courseId))
            return res.json({...courses.get(), liked, favorited})
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },

    //  GET/courses/featured
    featured: async(req: Request, res: Response) => {
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses()
            res.status(200).json(featuredCourses)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },


    // GET/courses/newest
    newest: async(req: Request, res: Response) => {
        try {
            const newestCourses = await courseService.getTopTenNewest()
            res.status(200).json(newestCourses)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },

    // GET/courses/search?name=
    search: async(req: Request, res: Response) => {
        const {name} = req.query
        const [page, perPage] = getPaginationParams(req.query)
        try {
            if (typeof name !== 'string') throw new Error ('name params must be of type string')
            const courses = await courseService.findByName(name,page,perPage)
            res.status(200).json(courses)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },

     // GET /courses/popular
  popular: async (req: Request, res: Response) => {
    try {
      const topTen = await courseService.getTopTenByLikes()
      return res.json(topTen)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }

}


export { coursesController }