import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
     title: {
          type: String,
          require: true
     },
     content: {
          type: String,
          require: true
     },
     author: {
          type: String,
          require: true
     },
     category: {
          type: String,
          require: true
     },
     airtistImg: {
          type: String,
          require: true
     },
     imageCover: {
          type: String,
          require: true
     },
     quote: {
          type: String,
          require: true
     }
}, {timestamps: true})

export default mongoose.model("blog", blogSchema);