import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    stateOrigin: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    genderType: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true
    },
    lgovOrigin: {
        type: String,
        required: true
    },
    kinName: {
        type: String,
        required: true
    },
    kinEmail: {
        type: String,
        required: true
    },
    kinTel: {
        type: String,
        required: true
    },
    kinRela: {
        type: String,
        required: true
    },
    kinOccup: {
        type: String,
        required: true
    },
    programType: {
        type: String,
        required: true
    },
    studyType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);