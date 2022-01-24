import { check, query } from 'express-validator'
import validateFields from './checkErrors.validations'

const createOrderValidations = [
   check('deliveryAddress')
      .not()
      .isEmpty()
      .withMessage('El ID de la direccion de entrega es obligatorio')
      .bail()
      .isMongoId()
      .withMessage('El ID de la direccion de entrega no es válido'),

   check('dealer')
      .not()
      .isEmpty()
      .withMessage('El ID del repartidor es obligatorio')
      .bail()
      .isMongoId()
      .withMessage('El ID del repartidor no es válido'),

   check('paymentMethod')
      .not()
      .isEmpty()
      .withMessage('El metodo de pago es obligatorio')
      .bail()
      .isIn(['CASH', 'CARD'])
      .withMessage(
         'El metodo de pago contiene un valor no válido, solo se acepta los valores CASH y CARD'
      ),

   validateFields,
]

const getOrdersByDealerValidations = [
   query('dealerId')
      .not()
      .isEmpty()
      .withMessage('El ID del repartidor es obligatorio')
      .bail()
      .isMongoId()
      .withMessage('El ID del repartidor no es válido'),

   validateFields,
]

export { createOrderValidations, getOrdersByDealerValidations }
