import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { use } from "bcrypt/promises.js";
import { passwordHash , passwordCompare} from "../helper/authhelper.js";
import usermodels from "../models/usermodels.js";
import jwt from "jsonwebtoken";

// For Register
export const registerClient = async (req, res) => {
    try {
        // Extract data from req.body and req.file
        const { firstName, lastName, photo, birthDate, nationality, stateOrigin, email, phoneNum, address, genderType, nationalId, lgovOrigin, kinName, kinEmail, kinTel, kinRela, kinOccup, programType, studyType, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !req.file) {
            return res.status(400).json({ success: false, msg: 'Please fill in all required fields.' });
        }

        // Construct imageURL using the filename provided by multer
        const photoURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // Save new user to database
        const newUser = await new usermodels({
            firstName, lastName, photo: photoURL, birthDate, nationality, stateOrigin, email, phoneNum, address, genderType, nationalId, lgovOrigin, kinName, kinEmail, kinTel, kinRela, kinOccup, programType, studyType, password
        }).save();

        res.status(200).json({
            success: true,
            msg: 'User registered successfully.',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};


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
          const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '2d'});
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