import { Request, Response } from "express";
import { courseService } from "../services/courseServices";

const coursesController = {

    // GET/courses/:id
    show: async(req: Request, res: Response) => {
        const {id} =req.params

        try {
            const courses = await courseService.findByIdWithEpisodes(id)
            res.status(200).json(courses)
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

}


export { coursesController }