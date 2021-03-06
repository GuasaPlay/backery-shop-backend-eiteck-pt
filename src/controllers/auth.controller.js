import { response400, response500 } from '../helpers/responseHandlers'
import User from '../models/User'

import { generateJWT } from '../utils/jwt.util'

const register = async (req, res) => {
   try {
      const { name, email, password } = req.body

      const user = await User.findOne({ email }, ['_id', 'password', 'state'])

      if (user)
         return response400(
            res,
            'El correo electrónico ya se encuentra registrado'
         )

      const passwordEncryted = await User.encryptPassword(password)

      const newUser = new User({
         name,
         email,
         password: passwordEncryted,
         role: 'CLIENT',
      })

      const userSaved = await newUser.save()

      const accessToken = await generateJWT({ id: userSaved.id })

      return res.status(200).json({
         ok: true,
         message: 'Usuario creado con éxito',
         accessToken,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const login = async (req, res) => {
   try {
      const { email, password } = req.body

      const user = await User.findOne({ email }, ['_id', 'password', 'state'])

      if (!user)
         return response400(res, 'Correo electrónico o contraseña incorrectos')

      if (!user.state)
         return response400(
            res,
            'Usuario deshabilitado para ingresar al sistema'
         )

      const isValidPassword = await User.isValidPassword(
         password,
         user.password
      )

      if (!isValidPassword) return response400(res, 'Contraseña incorrecta')

      const accessToken = await generateJWT({ id: user.id })

      return res.status(200).json({
         ok: true,
         accessToken,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const logout = async (req, res) => {
   try {
      return res
         .status(200)
         .json({ ok: true, message: 'Sesión cerrada con éxito' })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

const getUser = async (req, res) => {
   try {
      return res.status(200).json({
         ok: true,
         user: req.user,
      })
   } catch (error) {
      console.log(error)
      return response500(res)
   }
}

export { register, login, logout, getUser }
