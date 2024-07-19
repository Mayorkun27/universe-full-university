import express from "express";
import { saveCourseRegistration, getUserCourseRegistrations } from "../controller/courseRegistrationController.js";

const router = express.Router();

router.post('/save', saveCourseRegistration);
router.get('/get/:userId', getUserCourseRegistrations);

export default router;