import { use } from "bcrypt/promises.js";
import { passwordHash , passwordCompare} from "../helper/authhelper.js";
import usermodels from "../models/usermodels.js";
import jwt from "jsonwebtoken";

// For Register
export const registerClient = async (req, res) => {
     try {
         const {name,email, password} = req.body
         console.log(name, email, password)
         if (!name) {
             return res.send("Please enter your name")
         }
        
         if (!email) {
             return res.send("Please enter your email")
          }
          if (!password) {
              return res.send("Please enter your password")
          }
          const hashedPassword = await passwordHash(password)
     
          const usEmail = await usermodels.findOne({email})
          
          if (usEmail) {
              return res.status(201).send({
               success: false,
               msg: 'Email already exists'
              })
          }
          const newUser = await new  usermodels({name, email, password: hashedPassword}).save();
          res.status(200).send({
               success: true,
               msg: 'User saved sucessesfuly',
               newUser
          })
     } catch (error) {
         res.status(404).send({
          success: false,
          msg: error.message,
         });
     }
}

// For Login
export const loginClient = async (req, res) => {
     try {
          const{email, password}= req.body;
          if (!email) {
               return res.status(201).send({
                    success: false,
                    msg: "Unable to Login, please enter your email"
               })
          }
          if (!password) {
               return res.status(201).send({
                    success: false,
                    msg: "Unable to Login, please enter your password"
               })
          }
          const user = await usermodels.findOne({email});
          if (!user) {
               return res.status(404).send({
                    success: false,
                    msg: "Invalid Email, User does not exist"
               })
          }

          const match = await passwordCompare(password, user.password);
          if (!match) {
               return res.status(201).send({
                    success: false,
                    msg: "Invalid Password, please enter a valid password"
               })
          }
          // Change the expiresin to 10 minuites

          const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '30m'});
          // Seconds: 's', Minutes: 'm', Hours: 'h', Days: 'd', Weeks: 'w', Months: 'M' (though it's less common and sometimes not supported), Years: 'y'
          res.status(200).send({
               success: true,
               msg: "Login successful!!",
               user: {
                    name: user.name,
                    email: user.email,

               },
               token
          })
     } catch (error) {
          res.status(404);
          res.end(error);
     }
}

// // To get all users
export const getUsers = async (req, res) => {
     try {
          const allUsers = await usermodels.find();
          console.log(allUsers);
          res.json(allUsers);
          
     } catch (error) {
          res.status(404);
          res.end(error);
     }
}