import { Router } from 'express'
import passport from 'passport'

import isAdmin from '../middlewares/isAdmin.middleware'
import validateImages from '../middlewares/validateImages.middleware'
import { clearTempFiles } from '../helpers/clearTempFiles'

import {
   deleteDeliveryAddress,
   updateDeliveryAddress,
} from '../controllers/deliveryAddress.controller'

import {
   addImagesToProduct,
   createProduct,
   getProducts,
} from '../controllers/product.controller'

import {
   deleteDeliveryAddressValidations,
   updateDeliveryAddressValidations,
} from '../validations/deliveryAddress.validations'

import {
   addImagesToProductValidations,
   createProductValidations,
} from '../validations/product.validations'

const router = Router()

// Get products
router.get(
   '/get-products',
   [
      passport.authenticate('jwt', {
         session: false,
      }),
   ],
   getProducts
)

// Create product
router.post(
   '/create-product',
   [
      createProductValidations,
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
      addImagesToProductValidations,
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
