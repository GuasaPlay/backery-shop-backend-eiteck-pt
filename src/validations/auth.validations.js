import { check } from 'express-validator'
import validateFields from './checkErrors.validations'

const loginValidations = [
   check('email')
      .not()
      .isEmpty()
      .withMessage('El correo electrónico es obligatorio')
      .bail()
      .isEmail()
      .withMessage('El correo electrónico no es valido'),

   check('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres')
      .isLength({ max: 30 })
      .withMessage('La contraseña solo puede tener 30 caracteres'),

   validateFields,
]

export { loginValidations }
