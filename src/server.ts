// src/server.ts

import express from 'express'
import { database } from './database'
import { adminJs, adminJsRouter } from './adminjs'
import { router } from './routes'
import cors from 'cors'
const app = express()

app.use(express.static('public'))

app.use(cors())

app.use(express.json())

app.use(router)

app.use(adminJs.options.rootPath, adminJsRouter)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
  database.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})