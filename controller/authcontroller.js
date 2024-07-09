import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import { passwordHash, passwordCompare } from "../helper/authhelper.js";
import usermodels from "../models/usermodels.js";
import jwt from "jsonwebtoken";

// For Register
export const registerClient = async (req, res) => {
    try {
        // Extract data from req.body and req.file
        const { 
            firstName, lastName, birthDate, nationality, stateOrigin, 
            email, phoneNum, address, genderType, maritalStatus, religionType,  nationalId, lgovOrigin, 
            kinName, kinEmail, kinTel, kinRela, kinOccup, kinAddress, programType, 
            studyType, password 
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !req.file) {
            return res.status(400).json({ success: false, msg: 'Please fill in all required fields.' });
        }

        // Construct photoURL using the filename provided by multer
        const photoURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // Hash the password before saving to database
        const hashedPassword = await passwordHash(password);

        const usEmail = await usermodels.findOne({ email });

        if (usEmail) {
            return res.status(401).send({
                success: false,
                msg: 'Email already exists'
            });
        }

        const usPhone = await usermodels.findOne({ phoneNum });

        if (usPhone) {
            return res.status(401).send({
                success: false,
                msg: 'Phone Number already exists'
            });
        }

        const usNationalID = await usermodels.findOne({ nationalId });

        if (usNationalID) {
            return res.status(401).send({
                success: false,
                msg: 'National ID already exists'
            });
        }

        // Generate a unique matric number
        const generateMatricNumber = async () => {
            const year = new Date().getFullYear();
            const userCount = await usermodels.countDocuments({ admissionYear: year });
            const count = userCount + 1;
            const zero = 0;
            const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
            return `${year}${initials}${zero}${count}`;
        };

        const matricNumber = await generateMatricNumber();

        // Save new user to database
        const newUser = await new usermodels({
            firstName, lastName, photo: photoURL, birthDate, nationality, stateOrigin, email, phoneNum, address, genderType, maritalStatus, religionType,  nationalId, lgovOrigin, 
            kinName, kinEmail, kinTel, kinRela, kinOccup, kinAddress, programType, 
            studyType, password: hashedPassword, matricNumber, admissionYear: new Date().getFullYear()
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
         const { email, password } = req.body;
 
         // Check if email is provided
         if (!email) {
             return res.status(400).send({
                 success: false,
                 msg: "Unable to login, please enter your email"
             });
         }
 
         // Check if password is provided
         if (!password) {
             return res.status(400).send({
                 success: false,
                 msg: "Unable to login, please enter your password"
             });
         }
 
         // Check if user exists
         const user = await usermodels.findOne({ email });
         if (!user) {
             return res.status(404).send({
                 success: false,
                 msg: "Invalid email, user does not exist"
             });
         }
 
         // Compare the provided password with the stored password
         const match = await passwordCompare(password, user.password);
         if (!match) {
             return res.status(400).send({
                 success: false,
                 msg: "Invalid password, please enter a valid password"
             });
         }
 
         // Determine the redirect URL based on the user's role
         let redirectUrl = '';
         switch (user.role) {
             case 1:
                 redirectUrl = '/admin';
                 break;
             case 0:
                 redirectUrl = '/studentdash.html';
                 break;
             default:
                 return res.status(400).send({
                     success: false,
                     msg: "Unknown role"
                 });
         }
 
         // Generate JWT token
         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" });
 
         // Send the response and redirect
         res.status(200).send({
             success: true,
             msg: "Login successful!!",
             user: {
                 name: user.name,
                 email: user.email,
                 role: user.role,
                 userId: user._id
             },
             token,
             redirectUrl
         });
     } catch (error) {
         res.status(500).send({
             success: false,
             msg: "Server error",
             error: error.message
         });
     }
 };

export const getUsers = async (req, res) => {
    try {
        const allUsers = await usermodels.find();
        console.log(allUsers);
        res.json(allUsers);
    } catch (error) {
        res.status(404).end(error);
    }
};

// Delete Controller
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usermodels.findByIdAndDelete( id );
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            msg: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

export const getUserById = async (req, res) => {
     const userId = req.params.id; // Ensure req.params.id is used correctly
 
     try {
         const user = await usermodels.findById(userId); // Use findById to find user by ObjectId
         
         if (!user) {
             return res.status(404).json({ error: 'User not found' });
         }
 
         res.json({ user });
     } catch (err) {
         console.error(err);
         res.status(500).json({ error: 'Server error' });
     }
 };