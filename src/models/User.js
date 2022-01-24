import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      phone: {
         type: String,
      },
      deliveryAddresses: [
         {
            province: { type: String, required: true },
            canton: { type: String, required: true },
            postalCode: { type: String, required: true },
            streetAddress: { type: String, required: true },
            houseNumber: { type: String },
            reference: { type: String, required: true },
         },
      ],
      password: {
         type: String,
         required: true,
      },
      resetPassword: {
         type: Boolean,
         default: true,
      },
      state: {
         type: Boolean,
         default: true,
      },
      role: {
         type: String,
         enum: ['CLIENT', 'ADMIN', 'DEALER'],
      },
   },
   {
      timestamps: true,
      versionKey: false,
      toJSON: {
         getters: true,
         virtuals: true,
      },
      toObject: {
         getters: true,
         virtuals: true,
      },
   }
)

UserSchema.statics.encryptPassword = async password => {
   const salt = await bcrypt.genSalt()
   const hash = await bcrypt.hash(password, salt)
   return hash
}

UserSchema.statics.isValidPassword = async (password, encryptedPassword) => {
   const compare = await bcrypt.compare(password, encryptedPassword)
   return compare
}

export default model('User', UserSchema, 'Users')
