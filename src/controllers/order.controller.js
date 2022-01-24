import { response500 } from '../helpers/responseHandlers'

import Order from '../models/Order'
import Product from '../models/Product'

const getOrders = async (req, res) => {
   try {
      const { page = 1 } = req.query

      const populate = [
         {
            path: 'client',
            select: ['name', 'phone'],
         },
         {
            path: 'dealer',
            select: ['name'],
         },
         {
            path: 'deliveryAddress',
            select: ['-createdAt', '-updatedAt'],
         },
         {
            path: 'detail.product',
            select: ['name', 'images'],
            // populate: { path: 'images', select: ['-createdAt', '-updatedAt'] },
         },
      ]

      const options = { limit: 10, page, populate }

      const orders = await Order.paginate({}, options)

      return res.status(200).json({
         ok: true,
         orders,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const getOrdersByDealer = async (req, res) => {
   try {
      const { page = 1, dealerId } = req.query

      const populate = [
         {
            path: 'client',
            select: ['name', 'phone'],
         },
         {
            path: 'dealer',
            select: ['name'],
         },
         {
            path: 'deliveryAddress',
            select: ['-createdAt', '-updatedAt'],
         },
         {
            path: 'detail.product',
            select: ['name', 'images'],
            // populate: { path: 'images', select: ['-createdAt', '-updatedAt'] },
         },
      ]

      const options = { limit: 10, page, populate }

      const orders = await Order.paginate({ dealer: dealerId }, options)

      return res.status(200).json({
         ok: true,
         orders,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}
const getOrdersByClient = async (req, res) => {
   try {
      const { page = 1 } = req.query

      const clientId = req.user.uid.toString()

      const populate = [
         {
            path: 'client',
            select: ['name', 'phone'],
         },
         {
            path: 'dealer',
            select: ['name'],
         },
         {
            path: 'deliveryAddress',
            select: ['-createdAt', '-updatedAt'],
         },
         {
            path: 'detail.product',
            select: ['name', 'images'],
            // populate: { path: 'images', select: ['-createdAt', '-updatedAt'] },
         },
      ]

      const options = { limit: 10, page, populate }

      const orders = await Order.paginate({ client: clientId }, options)

      return res.status(200).json({
         ok: true,
         orders,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const createOrder = async (req, res) => {
   try {
      const { deliveryAddress, dealer, detail, paymentMethod } = req.body

      const client = req.user.uid.toString()

      let totalPay = 0
      detail.forEach(({ quantity, price }) => {
         totalPay += quantity * price
      })

      const newOrder = new Order({
         client,
         deliveryAddress,
         dealer,
         detail,
         totalPay,
         paymentMethod,
      })

      const orderSaved = await newOrder.save()

      await Promise.all(
         detail.map(async ({ product, quantity }) => {
            await Product.updateOne(
               { _id: product },
               {
                  $inc: { stock: -Math.abs(quantity) },
               }
            )
         })
      )

      return res.status(200).json({
         ok: true,
         message: 'Orden creada con éxito',
         order: orderSaved,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const dispatchOrder = async (req, res) => {
   try {
      const { orderId } = req.body

      await Order.updateOne(
         { _id: orderId },
         {
            orderStatus: 'DELIVERED',
         }
      )

      const orderUpdated = await Order.findById(
         orderId,
         {},
         { populate: { path: 'user' } }
      )

      return res.status(200).json({
         ok: true,
         message: 'Orden creada con éxito',
         order: orderUpdated,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

export {
   createOrder,
   getOrdersByDealer,
   getOrdersByClient,
   getOrders,
   dispatchOrder,
}
