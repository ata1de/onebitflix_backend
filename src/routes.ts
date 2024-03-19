import express from 'express'
import { categoriesController } from './controllers/categoryController'
import { coursesController } from './controllers/coursesController'
import { authController } from './controllers/authController'


const router = express.Router()

//POST
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

// GET
router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', coursesController.search)
router.get('/courses/:id', coursesController.show)

router.get('/episodes/stream', coursesController.search)


export { router }