import { Router } from 'express'
import passport from 'passport'
import {
   createOrder,
   getOrdersByDealer,
   getOrders,
   getOrdersByClient,
} from '../controllers/order.controller'

import validateOrderInfo from '../middlewares/validateOrderInfo.middleware'
import isAdmin from '../middlewares/isAdmin.middleware'
import { isDealer, isDealerYourself } from '../middlewares/isDealer.middleware'
import {
   createOrderValidations,
   getOrdersByDealerValidations,
} from '../validations/order.validations'

const router = Router()

// Get orders
router.get(
   '/get-orders',
   [
      passport.authenticate('jwt', {
         session: false,
      }),
      isAdmin,
   ],
   getOrders
)

// Get orders by dealer
router.get(
   '/get-orders-by-dealer',
   [
      getOrdersByDealerValidations,
      passport.authenticate('jwt', {
         session: false,
      }),
      isDealer,
      isDealerYourself,
   ],
   getOrdersByDealer
)

// Get orders by client
router.get(
   '/get-orders-by-client',
   [
      passport.authenticate('jwt', {
         session: false,
      }),
   ],
   getOrdersByClient
)

// Create order
router.post(
   '/create-order',
   [
      createOrderValidations,
      passport.authenticate('jwt', {
         session: false,
      }),
      validateOrderInfo,
   ],
   createOrder
)

export default router
