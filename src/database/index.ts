// src/database/index.ts

import { Sequelize } from 'sequelize'

export const database = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'onebitflix_development',
  username: 'onebitflix',
  password: 'onebitflix',
	define: {
    // configuração para formatar o camelCase
    underscored: true
  }
})