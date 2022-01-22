import dotenv from 'dotenv'

dotenv.config()

const config = {
   mondoUri: process.env.MONGO_URI,
   port: process.env.PORT,
   tokenKey: process.env.TOKEN_KEY,
}

export default config
