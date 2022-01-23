import { nanoid } from 'nanoid'
import { response400, response500 } from '../helpers/responseHandlers'

import User from '../models/User'

const createUser = async (req, res) => {
   try {
      const { name, email, role } = req.body

      const user = await User.findOne({ email }, ['_id', 'password', 'state'])

      if (user)
         return response400(
            res,
            'El correo electrónico ya se encuentra registrado'
         )

      const randomPassword = nanoid(6)
      console.log(randomPassword)

      const passwordEncryted = await User.encryptPassword('123456')

      const newUser = new User({
         name,
         email,
         password: passwordEncryted,
         role,
         resetPassword: false,
      })

      const userSaved = await newUser.save()

      return res.status(200).json({
         ok: true,
         message: 'Usuario creado con éxito',
         user: {
            name: userSaved.name,
            email: userSaved.email,
            state: userSaved.state,
            role: userSaved.role,
            resetPassword: userSaved.resetPassword,
         },
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

export { createUser }
