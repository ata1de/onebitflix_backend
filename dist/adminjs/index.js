"use strict";
// src/adminjs/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminJsRouter = exports.adminJs = void 0;
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
const sequelize_1 = __importDefault(require("@adminjs/sequelize"));
const database_1 = require("../database");
const resources_1 = require("./resources");
const dashboard_1 = require("./dashboard");
const branding_1 = require("./branding");
const authentication_1 = require("./authentication");
// libs instaladas para tirar o armazenamento na memoria para adiciionar as sessoes do usuário no Admin
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const enviroment_1 = require("../config/enviroment");
const SequelizeStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store);
const store = new SequelizeStore({ db: database_1.database });
// metodo para sincronizar para criar a tabela de gerenciamento de sessoes
store.sync();
adminjs_1.default.registerAdapter(sequelize_1.default);
exports.adminJs = new adminjs_1.default({
    databases: [database_1.database],
    resources: resources_1.adminJsResources,
    rootPath: '/admin',
    dashboard: dashboard_1.dashboardOptions,
    branding: branding_1.brandingOptions
});
exports.adminJsRouter = express_1.default.buildAuthenticatedRouter(exports.adminJs, authentication_1.authtenticationOptions, null, { resave: false,
    saveUninitialized: false,
    store: store,
    secret: enviroment_1.ADMINJS_COOKIE_PASSWORD
});
