import mongoose from "mongoose";

const courseRegistrationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    year: {
        type: String,
        required: true
    },
    courses: [{
        type: String,
        required: true
    }],
}, { timestamps: true });

export default mongoose.model("courseRegistration", courseRegistrationSchema);