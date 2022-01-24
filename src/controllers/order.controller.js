import { response500 } from '../helpers/responseHandlers'

import Order from '../models/Order'
import Product from '../models/Product'

const getOrders = async (req, res) => {
   try {
      const { page = 1 } = req.query

      const populate = {
         path: 'detail.product',
         select: ['name', 'imageIds'],
         // populate: { path: 'images', select: ['-createdAt', '-updatedAt'] },
      }

      const options = { limit: 10, page, populate }

      const products = await Order.paginate({}, options)

      return res.status(200).json({
         ok: true,
         products: products,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const getOrdersByDealer = async (req, res) => {
   try {
      const { page = 1, dealerId } = req.query

      const populate = {
         path: 'detail.product',
         select: ['name', 'imageIds'],
         // populate: { path: 'images', select: ['-createdAt', '-updatedAt'] },
      }

      const options = { limit: 10, page, populate }

      const products = await Order.paginate({ dealer: dealerId }, options)

      return res.status(200).json({
         ok: true,
         products: products,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const createOrder = async (req, res) => {
   try {
      const { client, deliveryAddress, dealer, detail } = req.body

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

export { createOrder, getOrdersByDealer, getOrders, dispatchOrder }
