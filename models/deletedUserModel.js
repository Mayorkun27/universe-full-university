import mongoose from 'mongoose';

const deletedUserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    photo: String,
    birthDate: Date,
    nationality: String,
    stateOrigin: String,
    email: String,
    phoneNum: String,
    address: String,
    genderType: String,
    maritalStatus: String,
    religionType: String,
    nationalId: String,
    lgovOrigin: String,
    kinName: String,
    kinEmail: String,
    kinTel: String,
    kinRela: String,
    kinOccup: String,
    kinAddress: String,
    programType: String,
    studyType: String,
    password: String,
    matricNumber: String,
    admissionYear: Number,
    role: {
        type: Number,
        default: 0,
    },
    deletedAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

export default mongoose.model('DeletedUser', deletedUserSchema);