import { check, query } from 'express-validator'
import validateFields from './checkErrors.validations'

const createProductValidations = [
   check('name').not().isEmpty().withMessage('El nombre es obligatorio').bail(),

   check('price')
      .not()
      .isEmpty()
      .withMessage('El precio del producto es obligatorio'),

   check('stock')
      .not()
      .isEmpty()
      .withMessage('El stock del producto es obligatorio'),

   validateFields,
]

const addImagesToProductValidations = [
   query('productId')
      .not()
      .isEmpty()
      .withMessage('El ID del producto es obligatorio')
      .bail()
      .isMongoId()
      .withMessage('El ID del producto no es válido'),

   validateFields,
]

export { createProductValidations, addImagesToProductValidations }
