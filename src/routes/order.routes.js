import { Router } from 'express'
import passport from 'passport'
import {
   createOrder,
   getOrdersByDealer,
   getOrders,
} from '../controllers/order.controller'

import validateOrderInfo from '../middlewares/validateOrderInfo.middleware'
import isAdmin from '../middlewares/isAdmin.middleware'
import isDealer from '../middlewares/isDealer.middleware'

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
      passport.authenticate('jwt', {
         session: false,
      }),
      isAdmin || isDealer,
   ],
   getOrdersByDealer
)

// Create order
router.post(
   '/create-order',
   [
      passport.authenticate('jwt', {
         session: false,
      }),
      validateOrderInfo,
   ],
   createOrder
)

export default router
