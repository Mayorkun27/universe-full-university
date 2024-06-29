import express from "express";
import { registerClient, loginClient, getUsers } from '../controller/authcontroller.js';
import { isAdmin, signinController } from "../middlewares/signinController.js";
import { requireAuth } from "../middlewares/logoutController.js"
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signUp', registerClient);

router.post('/login', loginClient);

router.get('/users', getUsers);

router.get('/protected-route', requireAuth, (req, res) => {
    res.send('This is a protected route');
});


router.get('/user', signinController, isAdmin)

export default router;