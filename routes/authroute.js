import express from 'express';
import { registerClient, loginClient, getUsers, deleteUser } from '../controller/authcontroller.js';

const router = express.Router();

router.post('/register', registerClient);
router.post('/login', loginClient);
router.get('/users', getUsers);
router.delete('/delete/:id', deleteUser);

export default router;