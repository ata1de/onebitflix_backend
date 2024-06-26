"use strict";
// src/adminjs/authentication.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authtenticationOptions = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const enviroment_1 = require("../config/enviroment");
exports.authtenticationOptions = {
    authenticate: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({ where: { email } });
        if (user && user.role === 'admin') {
            const matched = yield bcrypt_1.default.compare(password, user.password);
            if (matched) {
                return user;
            }
        }
        return false;
    }),
    cookiePassword: enviroment_1.ADMINJS_COOKIE_PASSWORD,
};
