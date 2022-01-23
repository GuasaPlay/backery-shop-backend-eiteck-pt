import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport'

import config from './config'
import DBConnection from './database/DBConnection'
import { jwtStrategy } from './auth/passportAuth'

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import deliveryAddressRoutes from './routes/deliveryAddress.routes'

async function startExpressServer() {
   passport.use(jwtStrategy)

   const app = express()
   app.use(morgan('dev'))
   app.use(cors())
   app.use(express.json())
   app.use(passport.initialize())

   const baseURL = '/api/v1'

   app.use(`${baseURL}/auth`, authRoutes)
   app.use(`${baseURL}/user`, userRoutes)
   app.use(`${baseURL}/delivery-address`, deliveryAddressRoutes)

   app.get('/', (_res, req) => {
      req.json({ message: 'BACKEND BACKERY SHOP' })
   })

   await DBConnection()

   app.listen(config.port || 5000, () => {
      console.log(`🚀 Server ready at http://localhost:${config.port}`)
   })
}

startExpressServer()
