import { response400 } from '../helpers/responseHandlers'

const isDealer = async (req, res, next) => {
   const { role } = req.user

   if (role !== 'DEALER')
      return response400(
         res,
         'Solo los repartidores pueden realizar esta acción'
      )

   return next()
}

export default isDealer
