// src/adminjs/index.ts

import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from './resources'
import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authtenticationOptions } from './authentication'
// libs instaladas para tirar o armazenamento na memoria para adiciionar as sessoes do usuário no Admin
import session from 'express-session'
import connectSession from 'connect-session-sequelize'
import { Sequelize } from 'sequelize'
import { ADMINJS_COOKIE_PASSWORD } from '../config/enviroment'

const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({ db: database})
// metodo para sincronizar para criar a tabela de gerenciamento de sessoes
store.sync()

AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
  databases: [database],
  resources: adminJsResources,
  rootPath: '/admin',
  dashboard: dashboardOptions,
  branding: brandingOptions
})

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs,
  authtenticationOptions,
  null,
  { resave: false,
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD
    }
)