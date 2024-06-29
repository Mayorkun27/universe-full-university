import  mongoose from "mongoose";
import dotenv from "dotenv";
import color from 'colors'
dotenv.config();

const connectDB = async () => {
     try {
          const corn = await  mongoose.connect(process.env.MONGO_URL)
          console.log(`Connected to database on host ${corn.connection.host}`.red);
     } catch (error) {
          console.log(`The error is ${error}`);
     }
}

export default connectDB