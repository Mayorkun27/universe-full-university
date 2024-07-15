import express from 'express';
import { facultyUpload, getfaculty } from '../controller/facultycontroller.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/facultyUpload', facultyUpload);
router.get('/allfaculty', getfaculty);

export default router;