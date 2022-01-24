import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const OrderSchema = new Schema(
   {
      client: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      deliveryAddress: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'DeliveryAddress',
      },
      dealer: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      detail: [
         {
            product: {
               type: Schema.Types.ObjectId,
               ref: 'Product',
               required: true,
            },
            quantity: {
               type: Schema.Types.Number,
               required: true,
            },
            price: {
               type: Schema.Types.Number,
               required: true,
            },
         },
      ],
      status: {
         type: String,
         default: 'PENDING',
         enum: ['PENDING', 'CANCELED', 'DELIVERED'],
      },
      totalPay: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: true,
      versionKey: false,
      // toJSON: {
      //    getters: true,
      //    virtuals: true,
      // },
      // toObject: {
      //    getters: true,
      //    virtuals: true,
      // },
   }
)

OrderSchema.plugin(mongoosePaginate)

export default model('Order', OrderSchema, 'Orders')
