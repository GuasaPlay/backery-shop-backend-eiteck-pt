import { response400 } from '../helpers/responseHandlers'

const isAdmin = async (req, res, next) => {
   const { role } = req.user
   console.log(req.user)
   if (role !== 'ADMIN')
      return response400(
         res,
         'No tienes el nivel de acceso suficiente para realizar esta acción'
      )

   return next()
}

export default isAdmin
