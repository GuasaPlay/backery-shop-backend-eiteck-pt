import { Router } from 'express'
import passport from 'passport'

import {
   addDeliveryAddress,
   deleteDeliveryAddress,
   getDelideryAdressesByUser,
   updateDeliveryAddress,
} from '../controllers/deliveryAddress.controller'
import {
   addDeliveryAddressValidations,
   deleteDeliveryAddressValidations,
   updateDeliveryAddressValidations,
} from '../validations/deliveryAddress.validations'

const router = Router()

// Get delivery addresses by User
router.get(
   '/get-delivery-addresses-by-user',
   [
      passport.authenticate('jwt', {
         session: false,
      }),
   ],
   getDelideryAdressesByUser
)

// Add delivery address
router.post(
   '/add-delivery-address',
   [
      addDeliveryAddressValidations,
      passport.authenticate('jwt', {
         session: false,
      }),
   ],
   addDeliveryAddress
)

// Update delivery address
router.put(
   '/update-delivery-address',
   [
      updateDeliveryAddressValidations,
      passport.authenticate('jwt', {
         session: false,
      }),
   ],
   updateDeliveryAddress
)

// Delete delivery address
router.delete(
   '/delete-delivery-address',
   [
      deleteDeliveryAddressValidations,
      passport.authenticate('jwt', {
         session: false,
      }),
   ],
   deleteDeliveryAddress
)

export default router
