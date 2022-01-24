import { response400, response500 } from '../helpers/responseHandlers'
import DeliveryAddress from '../models/DeliveryAddress'

import fs from 'fs'

import Product from '../models/Product'
import ProductImage from '../models/ProductImage'
import { uploadResizeImages } from '../utils/resizeImage'

const getProducts = async (req, res) => {
   try {
      const { page = 1, search = '' } = req.query

      const regex = new RegExp(search, 'i')

      const options = { limit: 10, page }

      const products = await Product.paginate(
         {
            $or: [{ name: regex }],
         },
         options
      )

      return res.status(200).json({
         ok: true,
         products,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const saveProductImages = async (req, productId) => {
   let imageIds = []
   let productImages = []

   if (Array.isArray(req.files.images)) {
      // Upload images and save in DB when there is more than one image
      const { images } = req.files

      const promisesOfUpload = images.map(async image => {
         const bufferFile = fs.readFileSync(image.tempFilePath)
         return await uploadResizeImages({
            bufferFile,
            productId,
         })
      })

      const allPreviews = await Promise.all(promisesOfUpload)

      const mapedAllPreviews = allPreviews.map(all => {
         return { previews: all, productId }
      })

      const productImageSaved = await ProductImage.insertMany(mapedAllPreviews)
      productImages = productImageSaved
      imageIds = productImageSaved.map(image => image.id)
   } else {
      // Upload images and save in DB when there is only one image
      const bufferFile = fs.readFileSync(req.files.images.tempFilePath)
      const previews = await uploadResizeImages({
         bufferFile,
         productId,
      })

      const productImageSaved = await ProductImage.insertMany([
         {
            previews,
            productId,
         },
      ])
      productImages = productImageSaved
      imageIds = productImageSaved.map(image => image.id)
   }

   return { imageIds, productImages }
}

const createProduct = async (req, res) => {
   try {
      const { name, desc, price, stock } = req.body

      const newProduct = new Product({ name, desc, price, stock })
      const productSaved = await newProduct.save()
      return res.status(200).json({
         ok: true,
         message: 'Producto creado con éxito',
         product: productSaved,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const addImagesToProduct = async (req, res) => {
   try {
      const { productId } = req.query

      console.log(req.files.images)

      const { imageIds, productImages } = await saveProductImages(
         req,
         productId
      )

      await Product.updateOne(
         { _id: productId },
         { $push: { imageIds: { $each: imageIds } } }
      )

      return res.status(200).json({
         ok: true,
         message: 'Imagenes del producto agregadas con éxito',
         productImages,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const updateProduct = async (req, res) => {
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

const deleteProduct = async (req, res) => {
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
   getProducts,
   createProduct,
   addImagesToProduct,
   updateProduct,
   deleteProduct,
}
