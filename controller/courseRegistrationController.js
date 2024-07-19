import courseRegistrationModel from "../models/courseRegistrationModel.js";

export const saveCourseRegistration = async (req, res) => {
    try {
        const courseRegistration = new courseRegistrationModel(req.body);
        await courseRegistration.save();
        res.status(200).json({ success: true, msg: 'Course registration details saved successfully', courseRegistration });
    } catch (error) {
        console.error('Error saving course registration:', error);
        res.status(500).json({ success: false, msg: error.message });
    }
};

export const getUserCourseRegistrations = async (req, res) => {
    const userId = req.params.userId;
    try {
        const courseRegistrations = await courseRegistrationModel.find({ userId });
        res.status(200).json({ success: true, msg: "All course registrations loaded", courseRegistrations });
    } catch (error) {
        console.error('Error fetching user course registrations:', error);
        res.status(500).json({ success: false, msg: error.message });
    }
};