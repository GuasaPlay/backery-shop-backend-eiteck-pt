import { check, query } from 'express-validator'
import validateFields from './checkErrors.validations'

const getDelideryAdressesByUserValidations = [
   query('userId')
      .not()
      .isEmpty()
      .withMessage('El ID del usuario es obligatorio')
      .bail()
      .isMongoId()
      .withMessage('El ID del usuario no es válido'),

   validateFields,
]

const addDeliveryAddressValidations = [
   check('deliveryAddress.province')
      .not()
      .isEmpty()
      .withMessage('La pronvincia es obligatoria'),

   check('deliveryAddress.canton')
      .not()
      .isEmpty()
      .withMessage('El cantón es obligatorio'),

   check('deliveryAddress.postalCode')
      .not()
      .isEmpty()
      .withMessage('El código postal es obligatorio'),

   check('deliveryAddress.streetAddress')
      .not()
      .isEmpty()
      .withMessage('La dirección es obligatoria'),

   check('deliveryAddress.user')
      .not()
      .isEmpty()
      .withMessage('El ID del usuario obligatorio')
      .bail()
      .isMongoId()
      .withMessage('El ID del usuario no es válido'),

   validateFields,
]

const updateDeliveryAddressValidations = [
   check('deliveryAddressesId')
      .not()
      .isEmpty()
      .withMessage('El ID de la dirección de entrega es obligatorio')
      .bail()
      .isMongoId()
      .withMessage('El ID de la dirección de entrega no es válido'),

   check('deliveryAddress.user')
      .isMongoId()
      .withMessage('El ID del usuario no es válido'),

   validateFields,
]

const deleteDeliveryAddressValidations = [
   query('deliveryAddressesId')
      .not()
      .isEmpty()
      .withMessage('El ID de la dirección de entrega es obligatorio')
      .bail()
      .isMongoId()
      .withMessage('El ID de la dirección de entrega no es válido'),

   validateFields,
]

export {
   getDelideryAdressesByUserValidations,
   addDeliveryAddressValidations,
   updateDeliveryAddressValidations,
   deleteDeliveryAddressValidations,
}
