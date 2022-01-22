import passportJWT from 'passport-jwt'

import config from '../config'
import User from '../models/User'

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

export const jwtStrategy = new JWTStrategy(
   {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.tokenKey,
   },
   async (jwtPayload, done) => {
      try {
         const { uid } = jwtPayload

         const user = await User.findById(uid, [
            '-password',
            '-createdAt',
            '-updatedAt',
         ]).lean()

         if (!user) return done(null, false)
         if (!user.state) return done(null, false)

         const { _id, name, email, role, state } = user

         return done(null, {
            uid: _id,
            name,
            email,
            state,
            role,
         })
      } catch (error) {
         console.log(error)
         return done('Ocurrio un error')
      }
   }
)

// passport.serializeUser((user, done) => {
//    if (user) done(null, user)
// })

// passport.deserializeUser((uid, done) => {
//    done(null, uid)
// })
