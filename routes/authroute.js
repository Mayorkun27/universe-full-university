import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { registerClient, loginClient, getUsers, deleteUser, getUserById } from '../controller/authcontroller.js';
import { requireAuth } from "../middlewares/logoutController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.use('/uploads', express.static('uploads'));
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signUp', upload.single('photo'), registerClient);
router.post("/login", loginClient);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete("/users/:id", deleteUser);
router.get('/protected-route', requireAuth, (req, res) => {
     res.send('This is a protected route');
 });
 

export default router;