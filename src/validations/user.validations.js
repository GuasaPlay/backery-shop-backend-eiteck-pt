import { check } from 'express-validator'
import validateFields from './checkErrors.validations'

const createUserValidations = [
   check('name').not().isEmpty().withMessage('El nombre es obligatorio').bail(),

   check('email')
      .not()
      .isEmpty()
      .withMessage('El correo electrónico es obligatorio')
      .bail()
      .isEmail()
      .withMessage('El correo electrónico no es valido'),

   check('role')
      .not()
      .isEmpty()
      .withMessage('El rol del usuario es obligatorio')
      .isIn(['CLIENT', 'ADMIN', 'DELIVERY'])
      .withMessage('El rol contiene un valor no válido'),

   validateFields,
]

export { createUserValidations }
