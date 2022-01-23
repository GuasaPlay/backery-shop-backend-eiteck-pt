import { Schema, model } from 'mongoose'

const DeliveryAddressSchema = new Schema(
   {
      province: {
         type: String,
         required: true,
      },
      canton: {
         type: String,
         required: true,
      },
      postalCode: {
         type: String,
         required: true,
      },
      streetAddress: {
         type: String,
         required: true,
      },
      houseNumber: {
         type: String,
      },
      reference: {
         type: String,
         required: true,
      },
      userId: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User',
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

DeliveryAddressSchema.virtual('user', {
   justOne: true,
   foreignField: '_id',
   localField: 'userId',
})

export default model(
   'DeliveryAddress',
   DeliveryAddressSchema,
   'DeliveryAddresses'
)
