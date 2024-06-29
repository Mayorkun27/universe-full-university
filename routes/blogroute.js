import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { getBlog, getBlogById, uploadBlog, deleteBlog, updateBlog } from '../controller/blogcontroller.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'airtistImg') {
            cb(null, 'uploads/airtistImg');
        } else if (file.fieldname === 'imageCover') {
            cb(null, 'uploads/CoverImg');
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'airtistImg', maxCount: 1 },
    { name: 'imageCover', maxCount: 1 },
]);

router.use('/uploads', express.static('uploads'));

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/upload', upload, uploadBlog);
router.get('/blogss', getBlog);
router.get('/blogss/:news_id', getBlogById); // Add route to get a blog by ID
router.put('/blogss/:news_id', upload, updateBlog); // Add the PUT route for updating a blog
router.delete('/blogss/:news_id', deleteBlog); // Add the DELETE route for deleting a blog

export default router;