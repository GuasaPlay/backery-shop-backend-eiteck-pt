import { nanoid } from 'nanoid'
import { response400, response500 } from '../helpers/responseHandlers'

import User from '../models/User'

const getUsers = async (req, res) => {
   try {
      const { page = 1, search = '' } = req.query

      const regex = new RegExp(search, 'i')

      const options = { limit: 10, page }

      const users = await User.paginate(
         {
            $or: [{ name: regex }, { email: regex }, { role: regex }],
         },
         options
      )

      return res.status(200).json({
         ok: true,
         users,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

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
            _id: userSaved._id,
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
const updateUserInfo = async (req, res) => {
   try {
      const { name, phone } = req.body

      const userId = req.user.uid.toString()

      const userInfo = { name, phone }

      const userExists = await User.exists({ _id: userId })

      if (!userExists)
         return response400(res, 'No existe ningun usuario con es ID')

      await User.updateOne(
         { _id: userId },
         {
            $set: { ...userInfo },
         }
      )

      const userUpdated = await User.findById(userId, [
         '-createdAt',
         '-updatedAt',
         '-password',
      ])

      return res.status(200).json({
         ok: true,
         message: 'Información del usuario actualizada con éxito',
         user: userUpdated,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

export { createUser, updateUserInfo, getUsers }
