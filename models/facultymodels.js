import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     courses: [String]
}, {timestamps: true})

export default mongoose.model('faculty', facultySchema)