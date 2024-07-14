import express from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import connectDB from './dB/connect.js';
import colors from 'colors'; // Fixed import name to match npm package
import morgan from 'morgan';
import usermodels from './models/usermodels.js';
import authroute from './routes/authroute.js';
import facultymodels from './models/facultymodels.js';
import facultyroute from './routes/facultyroute.js';
import crypto from 'crypto';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 2111;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(process.cwd(), 'public')));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/v1/auth', authroute);
app.use('/api/v1/faculty', facultyroute);

// Middleware for handling 404 errors
app.use((req, res, next) => {
     res.status(404).sendFile(path.join(process.cwd(), 'View/404.html'));
 });

 app.post('/api/saveTransaction', (req, res) => {
     const { ref, amount, status, type } = req.body;
     
     // Save the transaction to your database
     // Assuming you have a function saveTransaction that saves to the database
     saveTransaction(ref, amount, status, type)
         .then(() => {
             res.json({ success: true });
         })
         .catch(error => {
             console.error(error);
             res.json({ success: false });
         });
 });
 
 function saveTransaction(ref, amount, status, type) {
     // Implement your database saving logic here
     // Example using MongoDB
     return new Promise((resolve, reject) => {
         const transaction = new Transaction({ ref, amount, status, type });
         transaction.save(err => {
             if (err) reject(err);
             else resolve();
         });
     });
 }

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.bgBlue.red);
});