"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesController = void 0;
const courseServices_1 = require("../services/courseServices");
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const likeService_1 = require("../services/likeService");
const favoriteService_1 = require("../services/favoriteService");
const coursesController = {
    // GET/courses/:id
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courseId = req.params.id;
        const userId = req.user.id;
        try {
            const courses = yield courseServices_1.courseService.findByIdWithEpisodes(courseId);
            if (!courses) {
                return res.status(404).json({ message: 'Course not find' });
            }
            const liked = yield likeService_1.likeService.isLiked(userId, Number(courseId));
            const favorited = yield favoriteService_1.favoriteService.isFavorited(userId, Number(courseId));
            return res.json(Object.assign(Object.assign({}, courses.get()), { liked, favorited }));
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    }),
    //  GET/courses/featured
    featured: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const featuredCourses = yield courseServices_1.courseService.getRandomFeaturedCourses();
            res.status(200).json(featuredCourses);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    }),
    // GET/courses/newest
    newest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newestCourses = yield courseServices_1.courseService.getTopTenNewest();
            res.status(200).json(newestCourses);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    }),
    // GET/courses/search?name=
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            if (typeof name !== 'string')
                throw new Error('name params must be of type string');
            const courses = yield courseServices_1.courseService.findByName(name, page, perPage);
            res.status(200).json(courses);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    }),
    // GET /courses/popular
    popular: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const topTen = yield courseServices_1.courseService.getTopTenByLikes();
            return res.json(topTen);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    })
};
exports.coursesController = coursesController;
