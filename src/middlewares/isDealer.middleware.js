import { response400 } from '../helpers/responseHandlers'

const isDealer = async (req, res, next) => {
   const { role } = req.user

   if (role !== 'ADMIN' || role !== 'DEALER') {
      return next()
   } else {
      return response400(
         res,
         'Solo los repartidores pueden realizar esta acción'
      )
   }
}

const isDealerYourself = async (req, res, next) => {
   const { role } = req.user
   const { dealerId } = req.query

   if (role === 'ADMIN') return next()

   if (dealerId !== req.user.uid.toString())
      return response400(
         res,
         'No puedes consultar pedidos de otros repartidores'
      )

   return next()
}

export { isDealer, isDealerYourself }
