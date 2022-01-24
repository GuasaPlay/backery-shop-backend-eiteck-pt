import { Router } from 'express'
import passport from 'passport'

import {
   createUser,
   getUsers,
   updateUserInfo,
} from '../controllers/user.controller'
import {
   createUserValidations,
   updateUserInfoValidations,
} from '../validations/user.validations'

import isAdmin from '../middlewares/isAdmin.middleware'

const router = Router()

// Get users
router.get(
   '/get-users',
   [
      passport.authenticate('jwt', {
         session: false,
      }),
      isAdmin,
   ],
   getUsers
)

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
// Update user info
router.put(
   '/update-user-info',
   [
      updateUserInfoValidations,

      passport.authenticate('jwt', {
         session: false,
      }),
   ],
   updateUserInfo
)

export default router
