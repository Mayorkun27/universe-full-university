import transactionModel from "../models/transactionModel.js";

export const saveTransaction = async (req, res) => {
    try {
        const transaction = new transactionModel(req.body);
        await transaction.save();
        res.status(200).json({ success: true, msg: 'Transaction details saved successfully', transaction });
    } catch (error) {
        console.error('Error saving transaction:', error); // Log the error details
        res.status(500).json({ success: false, msg: error.message });
    }
};

export const getUserTransactions = async (req, res) => {
    const userId = req.params.userId;
    try {
        const transactions = await transactionModel.find({ userId });
        res.status(200).json({ success: true, msg: "All transactions Loaded", transactions });
    } catch (error) {
        console.error('Error fetching user transactions:', error); // Log the error details
        res.status(500).json({ success: false, msg: error.message });
    }
};

// get all transactions
export const getAllTransactions = async (req, res) => {
     try {
          const transactions = await transactionModel.find();
          res.status(200).json({
               success: true, 
               msg: "All transactions Loaded", 
               transactions
          });
     } catch (error) {
          console.error('Error fetching all transactions:', error); // Log the error details
          res.status(500).json({ success: false, msg: error.message });
     }
};
