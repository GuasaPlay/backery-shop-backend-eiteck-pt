import fs from 'fs'

const clearTempFiles = req => {
   if (!req.files || !req.files.images) return

   if (Array.isArray(req.files.images)) {
      req.files.images.forEach(image => {
         fs.unlink(image.tempFilePath, error => {
            if (error) throw error
            console.log('Deleted temporary images ')
         })
      })
   } else {
      fs.unlink(req.files.images.tempFilePath, error => {
         if (error) throw error
         console.log('Deleted temporary images ')
      })
   }
}

export { clearTempFiles }
