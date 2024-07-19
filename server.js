import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './dB/connect.js';
import morgan from 'morgan';
import fs from 'fs';  // Import the fs module
import authroute from './routes/authroute.js';
import facultyroute from './routes/facultyroute.js';
import transactionroute from './routes/transactionroute.js';
import courseRegistrationRoutes from "./routes/courseRegistrationRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 2111;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Middleware to remove .html extension and redirect
app.use((req, res, next) => {
    if (path.extname(req.url) === '.html') {
        const newUrl = req.url.substring(0, req.url.lastIndexOf('.'));
        console.log(`Redirecting from ${req.url} to ${newUrl}`);
        res.redirect(newUrl);
    } else {
        next();
    }
});

// Middleware to append .html for static files
app.use((req, res, next) => {
    if (!path.extname(req.url) && !req.url.startsWith('/api')) {
        const potentialFilePath = path.join(process.cwd(), 'public', req.url + '.html');
        console.log(`Checking for static file: ${potentialFilePath}`);
        if (fs.existsSync(potentialFilePath)) {
            req.url += '.html';
            console.log(`Rewriting URL to: ${req.url}`);
        }
    }
    next();
});

// Serve static files from the 'public' directory
app.use('/', express.static(path.join(process.cwd(), 'public')));

// Serve uploaded files from the 'uploads' directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API routes
app.use('/api/v1/auth', authroute);
app.use('/api/v1/faculty', facultyroute);
app.use('/api/v1/transaction', transactionroute);
app.use('/api/v1/courseRegistration', courseRegistrationRoutes);

// Middleware for handling 404 errors
app.use((req, res, next) => {
    console.log(`404 Not Found: ${req.url}`);
    res.status(404).sendFile(path.join(process.cwd(), 'View/404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});