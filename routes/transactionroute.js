import express from "express";
import { saveTransaction, getUserTransactions, getAllTransactions} from "../controller/transactionController.js";

const router = express.Router();

router.post('/save', saveTransaction);
router.get('/get/:userId', getUserTransactions);
router.get('/getAll', getAllTransactions);

export default router;
