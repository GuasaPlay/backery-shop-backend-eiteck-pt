import { Schema, model, Types } from 'mongoose'
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
      imageIds: [
         {
            type: Schema.Types.ObjectId,
            ref: 'ProductImage',
         },
      ],
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

ProductSchema.virtual('images', {
   justOne: true,
   foreignField: '_id',
   localField: 'imageIds',
})

ProductSchema.plugin(mongoosePaginate)

ProductSchema.statics.generateObjectId = () => Types.ObjectId()

export default model('Product', ProductSchema, 'Products')
