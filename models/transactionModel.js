import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    studyType: {
     type: String,
     required: true
    },
    year: {
     type: String,
     required: true
    },
    transRef: {
        type: String,
        required: true
    },
    transMsg: {
        type: String,
        required: true
    },
    transStatus: {
        type: String,
        required: true
    },
    transAmt: {
        type: Number,
        required: true
    },
    transType: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("transaction", transactionSchema);