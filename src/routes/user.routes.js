import { Router } from 'express'
import passport from 'passport'

import { createUser } from '../controllers/user.controller'
import { createUserValidations } from '../validations/user.validations'

import isAdmin from '../middlewares/isAdmin.middleware'

const router = Router()

// Create user
router.post(
   '/create-user',
   [
      createUserValidations,

      passport.authenticate('jwt', {
         session: false,
      }),
      isAdmin,
   ],
   createUser
)

export default router
