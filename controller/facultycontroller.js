import Faculty from '../models/facultymodels.js';

export const facultyUpload = async (req, res) => {
    try {
        const { name, courses } = req.body;
        const newFaculty = new Faculty({ name, courses });
        await newFaculty.save();
        res.status(201).json({ message: 'Faculty uploaded successfully!' });
    } catch (error) {
        console.error('Error in facultyUpload:', error);
        res.status(500).json({ error: 'An error occurred while uploading faculty.' });
    }
};

export const getfaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.status(200).json({
            success: true,
            data: faculty
        });
    } catch (error) {
        console.error('Error in getfaculty:', error);
        res.status(404).json({ error: 'An error occurred while fetching faculty.' });
    }
};