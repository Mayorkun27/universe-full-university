import express from "express";
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { registerClient, loginClient, getUsers } from '../controller/authcontroller.js';
import { isAdmin, signinController } from "../middlewares/signinController.js";

const router = express.Router();

const storage = multer.diskStorage({
     destination(req, file, cb) {
          cb(null, 'uploads/');
     },
     filename(req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname));
     }
});

const upload = multer({ storage: storage });

router.use('/uploads', express.static('uploads'));

router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signUp', upload.single('photo'), registerClient); // Use multer middleware here

router.post('/login', loginClient);

router.get('/users', getUsers);

router.get('/user', signinController, isAdmin);

export default router;