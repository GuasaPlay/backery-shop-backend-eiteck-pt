import sharp from 'sharp'
import { nanoid } from 'nanoid'

import S3Uploader from '../aws/S3Uploader'

const resizeImage = async (bufferFile, width) => {
   return await sharp(bufferFile)
      .resize({ width })
      .webp({ force: true })
      .toBuffer({ resolveWithObject: true })
}

const uploadResizeImages = async ({ bufferFile, productId }) => {
   const { width } = await sharp(bufferFile).metadata()

   const sizes = [150, 300, 600, 1200]
   const sizesToGeneratePreviews = sizes.filter(size => size <= width)

   const promisesOfPreviews = sizesToGeneratePreviews.map(async sizeImage => {
      // Change size of the image
      const { data, info } = await resizeImage(bufferFile, sizeImage)
      const { width, height, format, size } = info
      const keyPreview = `products/${productId}/images/${width}x${height}-${nanoid()}.${format}`
      const { fileId, url } = await S3Uploader(
         data,
         keyPreview,
         `image/${format}`
      )
      return { fileId, url, height, width, format, bytes: size }
   })

   const previews = await Promise.all(promisesOfPreviews)
   return previews
}

export { resizeImage, uploadResizeImages }
