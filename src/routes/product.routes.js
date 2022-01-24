import { Router } from 'express'
import passport from 'passport'

import isAdmin from '../middlewares/isAdmin.middleware'
import validateImages from '../middlewares/validateImages.middleware'

import {
   deleteDeliveryAddress,
   getDelideryAdressesByUser,
   updateDeliveryAddress,
} from '../controllers/deliveryAddress.controller'

import {
   addImagesToProduct,
   createProduct,
} from '../controllers/product.controller'

import {
   deleteDeliveryAddressValidations,
   getDelideryAdressesByUserValidations,
   updateDeliveryAddressValidations,
} from '../validations/deliveryAddress.validations'
import { clearTempFiles } from '../helpers/clearTempFiles'

const router = Router()

// Get delivery addresses by User
router.get(
   '/get-delivery-addresses-by-user',
   [
      getDelideryAdressesByUserValidations,
      passport.authenticate('jwt', {
         session: false,
      }),
   ],
   getDelideryAdressesByUser
)

// Create product
router.post(
   '/create-product',
   [
      passport.authenticate('jwt', {
         session: false,
      }),
      isAdmin,
   ],
   createProduct
)

// Add images to product
router.post(
   '/add-images-to-product',
   [
      passport.authenticate('jwt', {
         session: false,
      }),
      isAdmin,
      validateImages,
      (req, res, next) => {
         res.on('finish', () => clearTempFiles(req))
         next()
      },
   ],
   addImagesToProduct
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
