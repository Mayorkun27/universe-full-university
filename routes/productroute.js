import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { productUpload,  getProducts } from '../controller/productcontroller.js';

const router = express.Router();

const storage = multer.diskStorage({
     destination(req, file, cb) {
          cb(null, 'uploads/');
     },
     filename(req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname));
     }
});

const upload = multer({ storage : storage });

router.use('/uploads', express.static('uploads'));

router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/productUpload', upload.single('image'), productUpload);
router.get('/allProducts', getProducts);


export default router;