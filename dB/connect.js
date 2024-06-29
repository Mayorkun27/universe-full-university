import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connectdB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected on host ${con.connection.host}`.bgGreen);
    } catch (err) {
        console.log(`The error is ${err.message}`.bgRed);
    }
}


export default connectdB;