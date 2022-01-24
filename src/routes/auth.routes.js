import { Router } from 'express'
import passport from 'passport'

import {
   loginValidations,
   registerValidations,
} from '../validations/auth.validations'

import {
   register,
   getUser,
   login,
   logout,
} from '../controllers/auth.controller'

const router = Router()

// User register
router.post('/register', registerValidations, register)

// User login
router.post('/login', loginValidations, login)

// User logout
router.delete('/logout', logout)

// Get user
router.get(
   '/get-user',
   passport.authenticate('jwt', {
      session: false,
   }),
   getUser
)

export default router
