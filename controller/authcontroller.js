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
        if (!email) {
            return res.status(201).send({
                success: false,
                msg: "Unable to Login, please enter a valid email"
            });
        }
        if (!password) {
            return res.status(201).send({
                success: false,
                msg: "Unable to Login, please enter a valid password"
            });
        }
        const user = await usermodels.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "Invalid Email, User does not exist"
            });
        }

        const match = await passwordCompare(password, user.password);
        if (!match) {
            return res.status(201).send({
                success: false,
                msg: "Invalid Password, please enter a valid password"
            });
        }
        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '30m'});
          // Seconds: 's', Minutes: 'm', Hours: 'h', Days: 'd', Weeks: 'w', Months: 'M' (though it's less common and sometimes not supported), Years: 'y'
        res.status(200).redirect("/studentdash.html");
    } catch (error) {
        res.status(404).end(error);
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