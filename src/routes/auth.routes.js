import { Router } from 'express'
import passport from 'passport'

import { loginValidations } from '../validations/auth.validations'
import { getUser, login, logout } from '../controllers/auth.controller'

const router = Router()

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
