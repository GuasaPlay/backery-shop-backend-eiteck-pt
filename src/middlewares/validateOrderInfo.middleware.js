import { response400 } from '../helpers/responseHandlers'
import DeliveryAddress from '../models/DeliveryAddress'
import User from '../models/User'

const validateOrderInfo = async (req, res, next) => {
   const { client, deliveryAddress, dealer } = req.body

   const clientExists = await User.exists({ _id: client, status: true })

   if (!clientExists)
      return response400(
         res,
         'No se puede realizar el pedido, el cliente no existe'
      )

   const dealerExists = await User.exists({ _id: dealer, status: true })
   if (!dealerExists)
      return response400(
         res,
         'No se puede realizar el pedido, el repartidor no existe'
      )

   const deliveryAddressExists = await DeliveryAddress.exists({
      _id: deliveryAddress,
   })

   if (!deliveryAddressExists)
      return response400(
         res,
         'No se puede realizar el pedido, la direccion de entrega no existe'
      )

   return next()
}

export default validateOrderInfo
