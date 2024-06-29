import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectdB from './dB/connect.js';
import morgan from 'morgan';
import blogroute from './routes/blogroute.js';
import bcrypt from 'bcrypt';
import color from 'colors';
import usermodels from './models/usermodels.js';
import authroute from './routes/authroute.js';

const app = express();
dotenv.config();
connectdB();

app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(process.cwd(), "/public")))
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")))

app.use('/api/v1/auth', authroute);
app.use('/api/v1/blog', blogroute);

// Middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(process.cwd(), "/View/404.html"));
});

const PORT = process.env.PORT || 1111
app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`.bgMagenta);
});