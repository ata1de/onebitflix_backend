import express from 'express'
import { categoriesController } from './controllers/categoryController'
import { coursesController } from './controllers/coursesController'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { favoritesController } from './controllers/favoritesController'
import { likesController } from './controllers/likesController'
import { episodesController } from './controllers/episodesController'
import { usersController } from './controllers/userController'


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

router.get('/users/current', ensureAuth, usersController.show)
router.get('/users/current/watching', ensureAuth, usersController.watching)


// DELETE
router.delete('/favorites/:id', ensureAuth, favoritesController.delete)
router.delete('/likes', ensureAuth, likesController.destroy)

//PUT
router.put('/users/current', ensureAuth, usersController.update)
router.put('/users/current/password', ensureAuth, usersController.updatePassword)





export { router }