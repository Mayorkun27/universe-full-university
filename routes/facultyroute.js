import express from 'express';
import { facultyUpload, getfaculty } from '../controller/facultycontroller.js';

const router = express.Router();

router.post('/facultyUpload', facultyUpload);
router.get('/allfaculty', getfaculty);

export default router;