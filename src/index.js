import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import config from './config'
import DBConnection from './database/DBConnection'

async function startExpressServer() {
   const app = express()
   app.use(morgan('dev'))
   app.use(cors())
   app.use(express.json())

   app.get('/', (_res, req) => {
      req.json({ message: 'BACKEND BACKERY SHOP' })
   })

   await DBConnection()

   app.listen(config.port || 5000, () => {
      console.log(`🚀 Server ready at http://localhost:${config.port}`)
   })
}

startExpressServer()
