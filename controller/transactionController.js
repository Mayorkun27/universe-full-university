import transactionModel from "../models/transactionModel.js";

export const saveTransaction = async (req, res) => {
    try {
        const transaction = new transactionModel(req.body);
        await transaction.save();
        res.status(200).json({ success: true, msg: 'Transaction details saved successfully', transaction });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

export const getUserTransactions = async (req, res) => {
    const userId = req.params.userId;
    try {
        const transactions = await transactionModel.find({ userId });
        res.status(200).json({ success: true, msg: "All transactions Loaded", transactions });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};