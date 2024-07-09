import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     courses1: [String],
     courses2: [String],
     courses3: [String],
     courses4: [String],
     courses5: [String]
}, {timestamps: true})

export default mongoose.model('faculty', facultySchema)