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
            kinName, kinEmail, kinTel, kinRela, kinOccup, kinAddress, programType, firstYear, secondYear, thirdYear, fourthYear, fifthYear, 
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
            kinName, kinEmail, kinTel, kinRela, kinOccup, kinAddress, programType, firstYear, secondYear, thirdYear, fourthYear, fifthYear, studyType, password: hashedPassword, matricNumber, admissionYear: new Date().getFullYear()
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
         const { emailOrMatric, password } = req.body;

         // Check if email or matric number is provided
         if (!emailOrMatric) {
             return res.status(400).send({
                 success: false,
                 msg: "Unable to login, please enter your email or matric no"
             });
         }

         // Check if password is provided
         if (!password) {
             return res.status(400).send({
                 success: false,
                 msg: "Unable to login, please enter your password"
             });
         }

         // Ensure emailOrMatric is a string
         const emailOrMatricStr = String(emailOrMatric);

         // Determine whether emailOrMatric is an email or a matric number
         const isEmail = emailOrMatricStr.includes('@');
         const user = isEmail 
             ? await usermodels.findOne({ email: emailOrMatricStr }) 
             : await usermodels.findOne({ matricNumber: emailOrMatricStr });

         if (!user) {
             return res.status(404).send({
                 success: false,
                 msg: "Invalid email or Matric No, user does not exist"
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
                 redirectUrl = '/student';
                 break;
             default:
                 return res.status(400).send({
                     success: false,
                     msg: "Unknown role"
                 });
         }

         // Generate JWT token
         const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
          // Seconds: 's', Minutes: 'm', Hours: 'h', Days: 'd', Weeks: 'w', Months: 'M' (though it's less common and sometimes not supported), Years: 'y'

         // Send the response and redirect
         res.status(200).send({
             success: true,
             msg: "Login successful!!",
             user: {
                 name: user.name,
                 email: user.email,
                 matricNo: user.matricNumber,
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
 
 export const courseRegistration = async (req, res) => {
     const { userId, selectedYear, selectedCourses } = req.body;
 
     console.log('Received data:', req.body); // Log received data
 
     // Example validation, adapt to your needs
     if (!userId || !selectedYear || !selectedCourses || !Array.isArray(selectedCourses)) {
         return res.status(400).json({ error: 'Invalid request data' });
     }
 
     try {
         // Retrieve user by userId
         const user = await usermodels.findById(userId);
 
         if (!user) {
             return res.status(404).json({ error: 'User not found' });
         }
 
         // Initialize courses object if not already initialized
         if (!user.courses) {
             user.courses = {};
         }
 
         // Retrieve courses for the selected year from user's profile or database
         let currentCourses = user.courses[selectedYear] || []; // Default to empty array if undefined
 
         // Append new selected courses if they do not already exist
         selectedCourses.forEach(course => {
             if (!currentCourses.includes(course)) {
                 currentCourses.push(course);
             }
         });
 
         // Update user's course registration in the database
         user.courses[selectedYear] = currentCourses;
 
         // Save updated user object to the database
         await user.save();
 
         // Logging for debugging purposes
         console.log(`Updated courses for user ${user._id} for year ${selectedYear}:`, currentCourses);
 
         // Example response on success
         return res.status(200).json({ message: 'Courses registered successfully', updatedCourses: currentCourses });
     } catch (error) {
         console.error('Error registering courses:', error);
         return res.status(500).json({ error: 'Failed to register courses' });
     }
 };
 