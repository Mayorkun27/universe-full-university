import express from "express";
import { saveTransaction, getUserTransactions } from "../controller/transactionController.js";

const router = express.Router();

router.post('/save', saveTransaction);
router.get('/get/:userId', getUserTransactions);

export default router;
