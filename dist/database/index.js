"use strict";
// src/database/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
const enviroment_1 = require("../config/enviroment");
exports.database = new sequelize_1.Sequelize(enviroment_1.DATABASE_URL, {
    define: {
        // configuração para formatar o camelCase
        underscored: true
    }
});
