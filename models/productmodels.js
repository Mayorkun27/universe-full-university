import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
     name: {
          type: String
     },
     quantity: {
          type: Number
     },
     description: {
          type: String
     },
     price: {
          type: String
     },
     category: {
          type: String
     },
     image: {
          type : String,
          required: true
     }
}, {timestamps: true})

export default mongoose.model('product', productSchema)