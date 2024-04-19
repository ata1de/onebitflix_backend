"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("./controllers/categoryController");
const coursesController_1 = require("./controllers/coursesController");
const authController_1 = require("./controllers/authController");
const auth_1 = require("./middlewares/auth");
const favoritesController_1 = require("./controllers/favoritesController");
const likesController_1 = require("./controllers/likesController");
const episodesController_1 = require("./controllers/episodesController");
const userController_1 = require("./controllers/userController");
const router = express_1.default.Router();
exports.router = router;
//POST
router.post('/auth/register', authController_1.authController.register);
router.post('/auth/login', authController_1.authController.login);
router.post('/favorites', auth_1.ensureAuth, favoritesController_1.favoritesController.save);
router.post('/likes', auth_1.ensureAuth, likesController_1.likesController.save);
router.post('/episodes/:id/watchTime', auth_1.ensureAuth, episodesController_1.episodesController.setWatchTime);
// GET
router.get('/categories', auth_1.ensureAuth, categoryController_1.categoriesController.index);
router.get('/categories/:id', auth_1.ensureAuth, categoryController_1.categoriesController.show);
router.get('/courses/featured', auth_1.ensureAuth, coursesController_1.coursesController.featured);
router.get('/courses/newest', coursesController_1.coursesController.newest);
router.get('/courses/popular', auth_1.ensureAuth, coursesController_1.coursesController.popular);
router.get('/courses/search', auth_1.ensureAuth, coursesController_1.coursesController.search);
router.get('/courses/:id', auth_1.ensureAuth, coursesController_1.coursesController.show);
router.get('/episodes/stream', auth_1.ensureAuthViaQuery, coursesController_1.coursesController.search);
router.get('/episodes/:id/watchTime', auth_1.ensureAuth, episodesController_1.episodesController.getWatchTime);
router.get('/favorites', auth_1.ensureAuth, favoritesController_1.favoritesController.index);
router.get('/users/current', auth_1.ensureAuth, userController_1.usersController.show);
router.get('/users/current/watching', auth_1.ensureAuth, userController_1.usersController.watching);
// DELETE
router.delete('/favorites/:id', auth_1.ensureAuth, favoritesController_1.favoritesController.delete);
router.delete('/likes', auth_1.ensureAuth, likesController_1.likesController.destroy);
//PUT
router.put('/users/current', auth_1.ensureAuth, userController_1.usersController.update);
router.put('/users/current/password', auth_1.ensureAuth, userController_1.usersController.updatePassword);
