import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ProductSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
      },
      price: {
         type: Number,
         required: true,
      },
      stock: {
         type: Number,
         default: true,
      },
      images: [
         {
            type: Schema.Types.ObjectId,
            ref: 'ProductImage',
         },
      ],
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

ProductSchema.plugin(mongoosePaginate)

export default model('Product', ProductSchema, 'Products')
