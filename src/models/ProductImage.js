import { Schema, model } from 'mongoose'

const ProductImageSchema = new Schema(
   {
      previews: [
         {
            url: {
               type: String,
               required: true,
            },
            fileId: {
               type: String,
               default: null,
            },
            bytes: {
               type: Number,
               required: true,
            },
            format: {
               type: String,
               required: true,
            },
         },
      ],
      productId: {
         type: Schema.Types.ObjectId,
         ref: 'Product',
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

export default model('ProductImage', ProductImageSchema, 'ProductImages')
