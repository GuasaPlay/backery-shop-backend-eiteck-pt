import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

import config from '../config'

const createToken = (payload, expiresIn = '24h') => {
   return new Promise((resolve, reject) => {
      jwt.sign(
         payload,
         config.tokenKey,
         {
            expiresIn,
         },
         (error, token) => {
            if (error) {
               reject(new Error('No se pudo genera el token'))
            }
            resolve(token)
         }
      )
   })
}

const generateJWT = async ({ id, ipAddress, device }) => {
   const tokenId = nanoid(20)
   const payload = { uid: id, tokenId }
   const createdToken = await createToken(payload)
   return createdToken
}

const decodeToken = token => {
   try {
      const cleanToken = token.split(' ')[1]
      return jwt.decode(cleanToken)
   } catch (_error) {
      return false
   }
}

const verifyToken = token => {
   try {
      const cleanToken = token.split(' ')[1]
      return jwt.verify(cleanToken, config.tokenKey)
   } catch (_error) {
      return false
   }
}

export { generateJWT, decodeToken, verifyToken, createToken }
