import { response400, response500 } from '../helpers/responseHandlers'
import DeliveryAddress from '../models/DeliveryAddress'
import User from '../models/User'
import Order from '../models/Order'

const getDelideryAdressesByUser = async (req, res) => {
   try {
      const userId = req.user.uid.toString()

      const deliveryAddress = await DeliveryAddress.find({ user: userId })

      return res.status(200).json({
         ok: true,
         deliveryAddress,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const addDeliveryAddress = async (req, res) => {
   try {
      const { deliveryAddress } = req.body

      const userId = req.user.uid.toString()

      const user = await User.exists({ _id: userId })
      if (!user) return response400(res, 'No existe ningun usuario con ese ID')

      const newDeliveryAddress = new DeliveryAddress({
         ...deliveryAddress,
         user: userId,
      })
      const deliveryAddressSaved = await newDeliveryAddress.save()

      return res.status(200).json({
         ok: true,
         message: 'Dirección de entrega agregada con éxito',
         deliveryAddress: deliveryAddressSaved,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const updateDeliveryAddress = async (req, res) => {
   try {
      const { deliveryAddressesId, deliveryAddress } = req.body

      const deliveryAddressFound = await DeliveryAddress.exists({
         _id: deliveryAddressesId,
      })

      if (!deliveryAddressFound)
         return response400(
            res,
            'No existe ningun dirección de entrega con ese ID'
         )

      const deliveryAddressesUpdated = await DeliveryAddress.findByIdAndUpdate(
         deliveryAddressesId,
         {
            $set: { ...deliveryAddress },
         },
         { new: true }
      )

      return res.status(200).json({
         ok: true,
         message: 'Dirección de entrega actualizada con éxito',
         deliveryAddresses: deliveryAddressesUpdated,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const deleteDeliveryAddress = async (req, res) => {
   try {
      const { deliveryAddressesId } = req.query

      const deliveryAddresses = await DeliveryAddress.exists({
         _id: deliveryAddressesId,
      })

      if (!deliveryAddresses)
         return response400(
            res,
            'No existe ningun dirección de entrega con ese ID'
         )

      const existsOrder = await Order.findOne({
         deliveryAddress: deliveryAddressesId,
      }).lean()

      if (existsOrder)
         return response400(
            res,
            'La dirección de entraga esta agregada en varios pedidos, no se puede eliminar'
         )

      await DeliveryAddress.deleteOne({
         _id: deliveryAddressesId,
      })

      return res.status(200).json({
         ok: true,
         message: 'Dirección de entrega eliminada con éxito',
         deliveryAddresses: {
            id: deliveryAddressesId,
         },
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

export {
   getDelideryAdressesByUser,
   addDeliveryAddress,
   updateDeliveryAddress,
   deleteDeliveryAddress,
}
