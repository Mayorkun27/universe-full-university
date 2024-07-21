import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import { passwordHash, passwordCompare } from "../helper/authhelper.js";
import usermodels from "../models/usermodels.js";
import DeletedUser from "../models/deletedUserModel.js";
import jwt from "jsonwebtoken";

// For Register
export const registerClient = async (req, res) => {
    try {
        const { 
            firstName, lastName, birthDate, nationality, stateOrigin, 
            email, phoneNum, address, genderType, maritalStatus, religionType,  nationalId, lgovOrigin, 
            kinName, kinEmail, kinTel, kinRela, kinOccup, kinAddress, programType, studyType, password 
        } = req.body;

        if (!firstName || !lastName || !email || !password || !req.file) {
            return res.status(400).json({ success: false, msg: 'Please fill in all required fields.' });
        }

        const photoURL = `/uploads/${req.file.filename}`;
        const hashedPassword = await passwordHash(password);

        const usEmail = await usermodels.findOne({ email });
        if (usEmail) {
            return res.status(401).send({ success: false, msg: 'Email already exists' });
        }

        const usPhone = await usermodels.findOne({ phoneNum });
        if (usPhone) {
            return res.status(401).send({ success: false, msg: 'Phone Number already exists' });
        }

        const usNationalID = await usermodels.findOne({ nationalId });
        if (usNationalID) {
            return res.status(401).send({ success: false, msg: 'National ID already exists' });
        }

        const generateMatricNumber = async () => {
            const year = new Date().getFullYear();
            const userCount = await usermodels.countDocuments({ admissionYear: year });
            const count = userCount + 1;
            const zero = 0;
            const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
            return `${year}${initials}${zero}${count}`;
        };

        const matricNumber = await generateMatricNumber();

        const newUser = await new usermodels({
            firstName, lastName, photo: photoURL, birthDate, nationality, stateOrigin, email, phoneNum, address, genderType, maritalStatus, religionType,  nationalId, lgovOrigin, 
            kinName, kinEmail, kinTel, kinRela, kinOccup, kinAddress, programType, studyType, password: hashedPassword, matricNumber, admissionYear: new Date().getFullYear()
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

        if (!emailOrMatric) {
            return res.status(400).send({ success: false, msg: "Unable to login, please enter your email or matric no" });
        }

        if (!password) {
            return res.status(400).send({ success: false, msg: "Unable to login, please enter your password" });
        }

        const emailOrMatricStr = String(emailOrMatric);
        const isEmail = emailOrMatricStr.includes('@');
        const user = isEmail 
            ? await usermodels.findOne({ email: emailOrMatricStr }) 
            : await usermodels.findOne({ matricNumber: emailOrMatricStr });

        if (!user) {
            return res.status(404).send({ success: false, msg: "Invalid email or Matric No, user does not exist" });
        }

        const match = await passwordCompare(password, user.password);
        if (!match) {
            return res.status(400).send({ success: false, msg: "Invalid password, please enter a valid password" });
        }

        let redirectUrl = '';
        switch (user.role) {
            case 1:
                redirectUrl = '/admin';
                break;
            case 0:
                redirectUrl = '/student';
                break;
            default:
                return res.status(400).send({ success: false, msg: "Unknown role" });
        }

        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

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
        res.status(500).send({ success: false, msg: "Server error", error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const allUsers = await usermodels.find();
        res.json(allUsers);
    } catch (error) {
        res.status(404).end(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usermodels.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const deletedUser = new DeletedUser({
            ...user._doc,
            deletedAt: new Date()
        });

        await deletedUser.save();

        res.status(200).json({ success: true, msg: 'User deleted successfully and information saved to deleted users collection' });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await usermodels.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all deleted users
export const getDeletedUsers = async (req, res) => {
     try {
         const deletedUsers = await DeletedUser.find();
         res.status(200).json({ success: true, users: deletedUsers });
     } catch (error) {
         res.status(500).json({ success: false, msg: error.message });
     }
};