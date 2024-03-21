import express from 'express'
import { categoriesController } from './controllers/categoryController'
import { coursesController } from './controllers/coursesController'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { favoritesController } from './controllers/favoritesController'
import { likesController } from './controllers/likesController'
import { episodesController } from './controllers/episodesController'


const router = express.Router()

//POST
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/favorites', ensureAuth, favoritesController.save)
router.post('/likes', ensureAuth, likesController.save)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)


// GET
router.get('/categories', ensureAuth ,categoriesController.index)
router.get('/categories/:id',ensureAuth , categoriesController.show)

router.get('/courses/featured', ensureAuth ,coursesController.featured)
router.get('/courses/newest' ,coursesController.newest)
router.get('/courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/search', ensureAuth , coursesController.search)
router.get('/courses/:id', ensureAuth , coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery,coursesController.search)
router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)

router.get('/favorites', ensureAuth, favoritesController.index)

// DELETE
router.delete('/favorites', ensureAuth, favoritesController.delete)
router.delete('/likes', ensureAuth, likesController.destroy)




export { router }