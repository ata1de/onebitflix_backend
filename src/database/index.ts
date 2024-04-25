// src/database/index.ts

import { Sequelize } from 'sequelize'
import { DATABASE_URL } from '../config/enviroment'

export const database = new Sequelize(DATABASE_URL ,{
	define: {
    // configuração para formatar o camelCase
    underscored: true
  }
})