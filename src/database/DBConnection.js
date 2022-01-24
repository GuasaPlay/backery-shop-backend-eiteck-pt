import mongoose from 'mongoose'
import config from '../config'

const DBConnection = async () => {
   try {
      await mongoose.connect(config.mondoUri)
      console.log('DB is connected')
   } catch (error) {
      console.log(error)
      throw new Error('Failed to initialize database')
   }
}

export default DBConnection
