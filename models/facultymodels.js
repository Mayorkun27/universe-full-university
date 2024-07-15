import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    courses: {
        firstYear: [{ type: String }],
        secondYear: [{ type: String }],
        thirdYear: [{ type: String }],
        fourthYear: [{ type: String }],
        fifthYear: [{ type: String }]
    }
});

export default mongoose.model('Faculty', facultySchema);