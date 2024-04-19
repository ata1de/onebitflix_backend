"use strict";
// src/middlewares/auth.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthViaQuery = exports.ensureAuth = void 0;
const jwtService_1 = require("../services/jwtService");
const userService_1 = require("../services/userService");
function ensureAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' });
    }
    // formato do token - 'Bearer dsfoaihefa(token)'
    const token = authorizationHeader.replace(/Bearer /, '');
    jwtService_1.jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: token inválido' });
        }
        // truque do typescript para tipar o decoded
        userService_1.userService.findByEmail(decoded.email).then(user => {
            req.user = user;
            next();
        });
    });
}
exports.ensureAuth = ensureAuth;
// auth para bloquear o stream dos videos
function ensureAuthViaQuery(req, res, next) {
    const { token } = req.query;
    if (!token) {
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' });
    }
    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'O parâmetro token deve ser do tipo string' });
    }
    jwtService_1.jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: token inválido' });
        }
        userService_1.userService.findByEmail(decoded.email).then(user => {
            req.user = user;
            next();
        });
    });
}
exports.ensureAuthViaQuery = ensureAuthViaQuery;
