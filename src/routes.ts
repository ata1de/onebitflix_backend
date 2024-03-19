import express from 'express'
import { categoriesController } from './controllers/categoryController'
import { coursesController } from './controllers/coursesController'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { favoritesController } from './controllers/favoritesController'


const router = express.Router()

//POST
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/favorites', ensureAuth, favoritesController.save)

// GET
router.get('/categories', ensureAuth ,categoriesController.index)
router.get('/categories/:id',ensureAuth , categoriesController.show)

router.get('/courses/featured', ensureAuth ,coursesController.featured)
router.get('/courses/newest' ,coursesController.newest)
router.get('/courses/search', ensureAuth , coursesController.search)
router.get('/courses/:id', ensureAuth , coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery,coursesController.search)


export { router }