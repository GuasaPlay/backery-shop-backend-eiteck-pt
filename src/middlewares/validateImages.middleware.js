import { response400 } from '../helpers/responseHandlers'

const validateImages = async (req, res, next) => {
   if (!req.files || !req.files.images)
      return response400(res, 'No se agregado ninguna imagen')

   if (Array.isArray(req.files.images)) {
      const found = req.files.images.find(
         image => !image.mimetype.startsWith('image/')
      )

      if (found)
         return response400(res, `El archivo ${found.name}, no es una imagen`)
   } else {
      const isImage = req.files.images.mimetype.startsWith('image/')
      if (!isImage)
         return response400(
            res,
            `El archivo ${req.files.images.name}, no es una imagen`
         )
   }

   return next()
}

export default validateImages
