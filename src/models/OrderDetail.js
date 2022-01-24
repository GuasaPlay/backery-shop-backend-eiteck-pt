import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
   {
      productId: {
         type: Schema.Types.ObjectId,
         ref: 'Product',
         required: true,
      },
      productName: {
         type: String,
         required: true,
      },
      productQuantity: {
         type: Schema.Types.Number,
         required: true,
      },
      productPrice: {
         type: Schema.Types.Number,
         required: true,
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

export default model('Order', OrderSchema, 'Orders')
