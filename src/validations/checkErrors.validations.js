import { validationResult } from 'express-validator'

const errorFormatter = ({ value, msg, param, location }) => {
   return { value, message: msg, param, location }
}
const validateFields = (req, res, next) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({
         ok: false,
         errors: errors.formatWith(errorFormatter).array(),
      })
   }

   return next()
}

export default validateFields
