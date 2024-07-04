import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { facultyUpload, getfaculty } from '../../controller/facultycontroller.js';

const router = express.Router();

router.use('/uploads', express.static('uploads'));

router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// router.post('/productUpload', upload.single('image'), productUpload);
router.post('/facultyUpload', facultyUpload);
router.get('/allfaculty', getfaculty);


export default router;